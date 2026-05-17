import type { Parser, SourceKind } from '../types';
import { rsrLiveTimingParser } from './rsr-live-timing';
import { acServerManagerParser } from './ac-server-manager';
import { actiParser } from './acti';
import { genericHtmlTableParser } from './generic-html-table';
import { sraVmsParser } from './sra-vms';

const registry: Record<SourceKind, Parser> = {
  'rsr': rsrLiveTimingParser,
  'ac-server-manager': acServerManagerParser,
  'acti': actiParser,
  'generic': genericHtmlTableParser,
  'sra-vms': sraVmsParser,
};

export function getParser(kind: SourceKind): Parser {
  const p = registry[kind];
  if (!p) throw new Error(`No parser registered for source kind: ${kind}`);
  return p;
}

export const allParserKinds: SourceKind[] = ['rsr', 'ac-server-manager', 'acti', 'generic', 'sra-vms'];
