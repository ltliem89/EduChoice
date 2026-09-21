import { GameSpecification, ValidationResult } from '../types';
import { APPROVED_TOOLKITS } from '../data/approvedToolkits';
import { CONSTRUCT_LABELS } from './studentAnalytics';

// Single source of truth: CONSTRUCT_LABELS (20 construct chính thức, types.ts)
const APPROVED_CONSTRUCTS = new Set<string>(Object.keys(CONSTRUCT_LABELS));

export function validateGameSpecification(spec: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!spec || typeof spec !== 'object') {
    return {
      isValid: false,
      schemaValid: false,
      safetyValid: false,
      referencesValid: false,
      toolkitValid: false,
      errors: ['Game Specification phải là một đối tượng JSON hợp lệ.'],
      warnings: []
    };
  }

  // 1. Schema check - required fields
  const requiredFields = ['gameId', 'title', 'ageRange', 'durationMinutes', 'constructs', 'scenes', 'safety', 'version'];
  for (const field of requiredFields) {
    if (spec[field] === undefined || spec[field] === null) {
      errors.push(`Thiếu trường bắt buộc trong schema DSL: "${field}"`);
    }
  }

  // Game ID
  if (spec.gameId && typeof spec.gameId !== 'string') {
    errors.push('Trường "gameId" phải là chuỗi ký tự (vd: game_48_minutes).');
  }

  // Age Range
  if (spec.ageRange) {
    if (typeof spec.ageRange.min !== 'number' || typeof spec.ageRange.max !== 'number') {
      errors.push('Trường "ageRange" phải chứa số nguyên "min" và "max".');
    } else if (spec.ageRange.min < 6 || spec.ageRange.max > 22 || spec.ageRange.min > spec.ageRange.max) {
      errors.push('Độ tuổi không hợp lệ (hỗ trợ độ tuổi học đường 6-22 tuổi, min <= max).');
    }
  }

  // Duration
  if (typeof spec.durationMinutes !== 'number') {
    errors.push('Trường "durationMinutes" phải là số nguyên.');
  } else if (spec.durationMinutes < 1 || spec.durationMinutes > 5) {
    errors.push('Thời lượng trò chơi theo chuẩn micro-game DSL phải từ 1 đến 5 phút.');
  }

  // Version
  if (spec.version && typeof spec.version !== 'string') {
    errors.push('Trường "version" phải là chuỗi (vd: 1.0.0).');
  }

  // Safety
  let safetyValid = true;
  if (!spec.safety || typeof spec.safety !== 'object') {
    errors.push('Trường "safety" phải là đối tượng chứa status.');
    safetyValid = false;
  } else {
    if (!['approved', 'needs_review'].includes(spec.safety.status)) {
      errors.push('Trường "safety.status" phải là "approved" hoặc "needs_review".');
      safetyValid = false;
    }
    if (spec.safety.status !== 'approved') {
      warnings.push('Trò chơi đang ở trạng thái an toàn "needs_review". Cần kiểm duyệt viên phê duyệt trước khi xuất bản.');
    }
  }

  // Constructs check
  if (Array.isArray(spec.constructs)) {
    if (spec.constructs.length === 0) {
      warnings.push('Chưa chọn construct tâm lý nào cho trò chơi.');
    }
    for (const c of spec.constructs) {
      if (!APPROVED_CONSTRUCTS.has(c)) {
        warnings.push(`Construct "${c}" chưa nằm trong danh mục chuẩn quốc tế, cần kiểm tra lại.`);
      }
    }
  } else {
    errors.push('Trường "constructs" phải là một mảng chuỗi.');
  }

  // Scenes check & reference integrity
  let referencesValid = true;
  const sceneIds = new Set<string>();
  const validSceneTypes = ['situation', 'choice', 'consequence', 'intervention', 'reflection', 'ending'];

  if (!Array.isArray(spec.scenes) || spec.scenes.length === 0) {
    errors.push('Trường "scenes" phải là một mảng chứa ít nhất 1 phân cảnh.');
    referencesValid = false;
  } else {
    // Collect scene IDs
    for (let i = 0; i < spec.scenes.length; i++) {
      const s = spec.scenes[i];
      if (!s.id || typeof s.id !== 'string') {
        errors.push(`Cảnh thứ ${i + 1} thiếu trường "id".`);
      } else {
        if (sceneIds.has(s.id)) {
          errors.push(`Phát hiện trùng lặp Scene ID: "${s.id}".`);
          referencesValid = false;
        }
        sceneIds.add(s.id);
      }

      if (!s.type || !validSceneTypes.includes(s.type)) {
        errors.push(`Scene "${s.id || i}": type không hợp lệ. Phải thuộc: ${validSceneTypes.join(', ')}`);
      }

      if (typeof s.content !== 'string' || s.content.trim() === '') {
        errors.push(`Scene "${s.id || i}": trường "content" không được để trống.`);
      }
    }

    // Check choice references and branch integrity
    const approvedToolkitIds = new Set(APPROVED_TOOLKITS.map(t => t.id));
    let hasChoice = false;
    let hasConsequence = false;

    for (const s of spec.scenes) {
      if (s.type === 'choice') {
        hasChoice = true;
        if (!Array.isArray(s.choices) || s.choices.length === 0) {
          errors.push(`Scene lựa chọn "${s.id}" phải có ít nhất 1 phần tử trong "choices".`);
        } else {
          for (const ch of s.choices) {
            if (!ch.id || !ch.label || !ch.consequenceId) {
              errors.push(`Lựa chọn trong scene "${s.id}" thiếu id, label hoặc consequenceId.`);
              referencesValid = false;
            } else if (!sceneIds.has(ch.consequenceId)) {
              errors.push(`Lỗi liên kết rẽ nhánh: Lựa chọn "${ch.id}" dẫn tới consequenceId "${ch.consequenceId}" không tồn tại trong danh sách scenes.`);
              referencesValid = false;
            }
          }
        }
      }

      if (s.type === 'consequence') {
        hasConsequence = true;
      }

      if (s.toolkitId && !approvedToolkitIds.has(s.toolkitId)) {
        warnings.push(`Toolkit ID "${s.toolkitId}" trong scene "${s.id}" chưa nằm trong danh mục 13 công cụ tâm lý đã phê duyệt.`);
      }

      if (s.nextSceneId && !sceneIds.has(s.nextSceneId)) {
        errors.push(`Scene "${s.id}" dẫn tới nextSceneId "${s.nextSceneId}" không tồn tại.`);
        referencesValid = false;
      }
    }

    if (!hasChoice) {
      warnings.push('Trò chơi chưa có scene loại "choice" nào.');
    }
    if (!hasConsequence && hasChoice) {
      warnings.push('Trò chơi có lựa chọn nhưng chưa có scene kết quả "consequence".');
    }
  }

  const schemaValid = errors.length === 0;
  const isValid = schemaValid && referencesValid && (safetyValid || spec.safety?.status === 'approved');

  return {
    isValid,
    schemaValid,
    safetyValid,
    referencesValid,
    toolkitValid: true,
    errors,
    warnings
  };
}
