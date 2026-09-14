export type StageId =
  | 'init'
  | 'build'
  | 'test'
  | 'pipeline'
  | 'ship'
  | 'release'
  | 'artifact'
  | 'connect';

export type StageStatus = 'queued' | 'running' | 'passed';

export interface Stage {
  id: StageId;
  /** Two digit job number shown in the rail and the section header. */
  job: string;
  /** Short label used by the pipeline rail. */
  label: string;
  /** Human readable section title. */
  title: string;
  /** One line describing what happens in this stage. */
  summary: string;
}

export interface ProfileSpec {
  key: string;
  value: string | string[];
}

export interface SkillGroup {
  id: string;
  label: string;
  /** Mono caption describing why the group exists. */
  note: string;
  items: { name: string; detail: string }[];
}

export interface ImpactArea {
  tag: string;
  detail: string;
}

export interface ReleaseEntry {
  id: string;
  /** Version-style marker, e.g. v2026.06 */
  version: string;
  status: 'current' | 'shipped' | 'foundation';
  period: string;
  org: string;
  role: string;
  location?: string;
  headline: string;
  impact: ImpactArea[];
  stack: string[];
}

export interface PipelineNode {
  id: string;
  label: string;
  kind: 'source' | 'test' | 'report' | 'ci' | 'container' | 'result';
  detail: string;
  meta: string;
}

export interface TestCase {
  id: string;
  suite: 'ui' | 'api';
  path: string;
  name: string;
  ms: number;
}

export interface CiStep {
  name: string;
  command: string;
  duration: string;
}

export interface InfraNode {
  id: string;
  label: string;
  sub: string;
  detail: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  role: string;
  opportunity: string;
  message: string;
  /** Honeypot — must stay empty. */
  website?: string;
  /** Client render timestamp, used to reject instant bot submits. */
  renderedAt?: number;
}

export type ContactResponse =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: Partial<Record<keyof ContactPayload, string>> };
