/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { CookieParameter } from './Cookie';

export const serverParams = {
  cookie: {
    regexp: /cookie\s+([a-zA-Z-0-9]+)\s+(rewrite|insert|prefix)/gi,
    parser: CookieParameter
  },
  // addr: {
  //   regex: /addr\s+(ipv4|ipv6)/gi,
  //   transform: (result: RegExpExecArray | null) => result 
  //     ? {
  //       addr: (result || [])[1]
  //     }
  //     : undefined
  // },

  // 'agent-check': {
  //   regex: /agent-check/gi,
  //   transform: (result: RegExpExecArray | null) => result
  //     ? {
  //       'agent-check': true
  //     }
  //     : undefined
  // },

  // 'agent-send': /agent-send\s+([a-zA-Z0-9]+)/gi,
  // 'agent-inter': {
  //   regex: /agent-inter\s*([0-9]+)?(us|ms|s|m|h|d)?/gi,
  //   transform: (result: RegExpExecArray | null) => result
  //     ? {
  //       interval: (result || [])[1],
  //       unit: (result || [])[2] || 'ms'
  //     }
  //     : undefined
  // },
  // 'agent-addr': /agent-addr\s+((?:[0-9]{1,3}\.?){4,}|[a-zA-Z0-9]+)/gi,
  // 'agent-port': /agent-port\s+([0-9]{1,6})/gi,
  // 'allow-0rtt': /allow-0rtt/gi,
  // alpn: /alpn\s+((?:(?:h2|http\/1.1|http\/1.0|http\/2),?)+)/gi,
  // backup: /backup/gi,
  // 'ca-file': /ca-file\s+((?:\/|\.\/)?(?:\w+\/?)+(?:\.\w+)?)/gi,
  // 'crl-file': /crl-file\s+((?:\/|\.\/)?(?:\w+\/?)+(?:\.\w+)?)/gi,
  // 'crt': /crt\s+((?:\/|\.\/)?(?:\w+\/?)+(?:\.\w+)?)/gi,
  // check: {
  //   regex: /check/gi,
  //   transform: (result: RegExpExecArray | null) => result
  //     ? true
  //     : undefined
  // },
  // disabled: /disabled/gi,
  // enabled: /enabled/gi,
  // 'error-limit': /error-limit\s+([0-9]+)/gi,
  // 'fall': /fall\s+([0-9]+)/gi,
  // 'id': /id\s+(\w+)/gi,
  // 'inter': /inter\s*([0-9]+)?(us|ms|s|m|h|d)?/gi,
  // 'fastinter': /fastinter\s*([0-9]+)?(us|ms|s|m|h|d)?/gi,
  // 'downinter': /downinter\s*([0-9]+)?(us|ms|s|m|h|d)?/gi,
  // 'init-addr': {
  //   regex: /init-addr\s+((?:(?:last|libc|none|(?:[0-9]{1,3}\.?){4,}),?)+)/gi,
  //   transform: (result: RegExpExecArray | null) => {
  //     if (!result) return undefined;

  //     console.log(result);

  //     const [_, list] = result;

  //     return list.split(',');
  //   }
  // }
};

export const getParamByName = (name: string) => serverParams[name as keyof typeof serverParams];
