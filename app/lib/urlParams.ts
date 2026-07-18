import { ChipFamily, DeviceType, RankingScenario, SortKey } from '../types';

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

export const parseUrlParams = (): UrlParams => {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.hash.substring(1));
  const result: UrlParams = {};
  
  if (params.has('search')) result.search = params.get('search') || undefined;
  if (params.has('type')) result.type = (params.get('type') || 'All') as DeviceType | 'All';
  if (params.has('family')) result.family = (params.get('family') || 'All') as ChipFamily | 'All';
  if (params.has('os')) result.os = params.get('os') || undefined;
  if (params.has('sort')) result.sort = (params.get('sort') || 'score') as SortKey;
  if (params.has('dir')) result.dir = (params.get('dir') === 'asc' ? 'asc' : 'desc');
  if (params.has('scenario')) result.scenario = (params.get('scenario') || 'balanced') as RankingScenario;
  if (params.has('ref')) result.ref = params.get('ref') === 'true';
  if (params.has('compare')) result.compare = params.get('compare')?.split(',').filter(Boolean) || [];
  if (params.has('model')) result.model = params.get('model') || undefined;
  
  return result;
};

export const buildUrlParams = (params: Partial<UrlParams>): string => {
  const searchParams = new URLSearchParams();
  
  if (params.search) searchParams.set('search', params.search);
  if (params.type && params.type !== 'All') searchParams.set('type', params.type);
  if (params.family && params.family !== 'All') searchParams.set('family', params.family);
  if (params.os && params.os !== 'All') searchParams.set('os', params.os);
  if (params.sort && params.sort !== 'score') searchParams.set('sort', params.sort);
  if (params.dir && params.dir !== 'desc') searchParams.set('dir', params.dir);
  if (params.scenario && params.scenario !== 'balanced') searchParams.set('scenario', params.scenario);
  if (params.ref) searchParams.set('ref', 'true');
  if (params.compare?.length) searchParams.set('compare', params.compare.join(','));
  if (params.model) searchParams.set('model', params.model);
  
  return searchParams.toString();
};

export const updateUrlHash = (params: Partial<UrlParams>) => {
  const newHash = buildUrlParams(params);
  if (window.location.hash.substring(1) !== newHash) {
    window.location.hash = newHash;
  }
};