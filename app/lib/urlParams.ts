
import { ChipFamily, DeviceType, RankingScenario, SortKey } from '../types';

const MAX_SEARCH_LENGTH = 200;
const MAX_COMPARE_ITEMS = 10;
const SAFE_ID_PATTERN = /^[a-zA-Z0-9_-]{1,64}$/;

const VALID_TYPES: Array<DeviceType | 'All'> = [
  'All', DeviceType.Laptop, DeviceType.Desktop, DeviceType.Tablet, DeviceType.GPU, DeviceType.CPU,
];

const VALID_FAMILIES: Array<ChipFamily | 'All'> = [
  'All', ChipFamily.M5, ChipFamily.M4, ChipFamily.M3, ChipFamily.M2, ChipFamily.M1,
  ChipFamily.A17, ChipFamily.Intel, ChipFamily.Reference,
];

const VALID_SORTS: SortKey[] = ['score', 'price', 'year', 'name', 'cpu', 'gpu', 'memory', 'value'];
const VALID_SCENARIOS: RankingScenario[] = ['balanced', 'developer', 'creative', 'daily'];

export interface UrlParams {
  search?: string;
  type?: DeviceType | 'All';
  family?: ChipFamily | 'All';
  os?: string;
  sort?: SortKey;
  dir?: 'asc' | 'desc';
  scenario?: RankingScenario;
  ref?: boolean;
  compare?: string[];
  model?: string;
}

function safeHash(): string {
  if (typeof window === 'undefined' || !window.location) return '';
  try {
    const hash = window.location.hash;
    if (!hash || hash.length > 2000) return '';
    return hash.substring(1);
  } catch {
    return '';
  }
}

function safeParam(params: URLSearchParams, key: string): string | undefined {
  try {
    if (!params.has(key)) return undefined;
    const value = params.get(key);
    if (value == null) return undefined;
    if (value.length > MAX_SEARCH_LENGTH) return undefined;
    return value;
  } catch {
    return undefined;
  }
}

export const parseUrlParams = (): UrlParams => {
  const rawHash = safeHash();
  if (!rawHash) return {};

  let params: URLSearchParams;
  try {
    params = new URLSearchParams(rawHash);
  } catch {
    return {};
  }

  const result: UrlParams = {};

  const searchRaw = safeParam(params, 'search');
  if (searchRaw != null) {
    result.search = searchRaw.replace(/[<>]/g, '');
  }

  const typeRaw = safeParam(params, 'type');
  if (typeRaw != null && VALID_TYPES.includes(typeRaw as DeviceType | 'All')) {
    result.type = typeRaw as DeviceType | 'All';
  }

  const familyRaw = safeParam(params, 'family');
  if (familyRaw != null && VALID_FAMILIES.includes(familyRaw as ChipFamily | 'All')) {
    result.family = familyRaw as ChipFamily | 'All';
  }

  const osRaw = safeParam(params, 'os');
  if (osRaw != null && osRaw.length < 20) {
    result.os = osRaw.replace(/[<>]/g, '');
  }

  const sortRaw = safeParam(params, 'sort');
  if (sortRaw != null && VALID_SORTS.includes(sortRaw as SortKey)) {
    result.sort = sortRaw as SortKey;
  }

  const dirRaw = safeParam(params, 'dir');
  if (dirRaw != null && (dirRaw === 'asc' || dirRaw === 'desc')) {
    result.dir = dirRaw;
  }

  const scenarioRaw = safeParam(params, 'scenario');
  if (scenarioRaw != null && VALID_SCENARIOS.includes(scenarioRaw as RankingScenario)) {
    result.scenario = scenarioRaw as RankingScenario;
  }

  const refRaw = safeParam(params, 'ref');
  if (refRaw != null && refRaw === 'true') {
    result.ref = true;
  }

  const compareRaw = safeParam(params, 'compare');
  if (compareRaw != null) {
    const items = compareRaw.split(',').filter(item => SAFE_ID_PATTERN.test(item));
    if (items.length > 0 && items.length <= MAX_COMPARE_ITEMS) {
      result.compare = items;
    }
  }

  const modelRaw = safeParam(params, 'model');
  if (modelRaw != null && SAFE_ID_PATTERN.test(modelRaw)) {
    result.model = modelRaw;
  }

  return result;
};

export const buildUrlParams = (params: Partial<UrlParams>): string => {
  const parts: string[] = [];

  if (params.search && params.search.length < MAX_SEARCH_LENGTH) {
    parts.push(`search=${encodeURIComponent(params.search)}`);
  }
  if (params.type && VALID_TYPES.includes(params.type)) {
    parts.push(`type=${params.type}`);
  }
  if (params.family && VALID_FAMILIES.includes(params.family)) {
    parts.push(`family=${params.family}`);
  }
  if (params.os && params.os.length < 20) {
    parts.push(`os=${encodeURIComponent(params.os)}`);
  }
  if (params.sort && VALID_SORTS.includes(params.sort)) {
    parts.push(`sort=${params.sort}`);
  }
  if (params.dir && (params.dir === 'asc' || params.dir === 'desc')) {
    parts.push(`dir=${params.dir}`);
  }
  if (params.scenario && VALID_SCENARIOS.includes(params.scenario)) {
    parts.push(`scenario=${params.scenario}`);
  }
  if (params.ref) {
    parts.push('ref=true');
  }
  if (params.compare && params.compare.length > 0 && params.compare.length <= MAX_COMPARE_ITEMS) {
    const safeItems = params.compare.filter(item => SAFE_ID_PATTERN.test(item));
    if (safeItems.length > 0) {
      parts.push(`compare=${safeItems.join(',')}`);
    }
  }
  if (params.model && SAFE_ID_PATTERN.test(params.model)) {
    parts.push(`model=${params.model}`);
  }

  return parts.join('&');
};

export const updateUrlHash = (params: Partial<UrlParams>) => {
  if (typeof window === 'undefined' || !window.history) return;

  const newHash = buildUrlParams(params);

  try {
    if (window.location.hash.substring(1) !== newHash) {
      window.history.replaceState(null, '', newHash ? `#${newHash}` : window.location.pathname);
    }
  } catch {
    // fallback for environments without history API support
    if (window.location.hash.substring(1) !== newHash) {
      window.location.hash = newHash;
    }
  }
};
