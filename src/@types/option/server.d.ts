
export type IpAddr = string;
export type InitAddr = ('last' | 'libc' | 'none' | IpAddr)[];
export type SSLVer = 'SSLv3' | 'TLSv1.0' | 'TLSv1.1' | 'TLSv1.2' | 'TLSv1.3';

/**
 * Docs:
 * https://cbonte.github.io/haproxy-dconv/2.0/configuration.html#5.2
 */
export interface ServerOptions {
  name: string;
  address: string;
  addr?: 'ipv4' | 'ipv6';

  'agent-check'?: boolean;
  'agent-send'?: string;
  'agent-inter'?: number | string;
  'agent-addr'?: string;
  'agent-port'?: number;

  'allow-0rtt'?: boolean;
  alpn?: string[];
  backup?: boolean;
  'ca-file'?: string;

  check?: boolean;
  'check-send-proxy'?: boolean;
  'check-alpn'?: string[];
  'check-sni'?: string;
  'check-ssl'?: boolean;
  'check-via-socks4'?: boolean;

  ciphers?: string[];
  ciphersuites?: string[];
  cookie?: string | string[];
  'crl-file'?: string;
  crt?: string;

  disabled?: boolean;
  enabled?: boolean;
  'error-limit'?: number;
  fall?: number;

  'force-sslv3'?: boolean;
  'force-tslv10'?: boolean;
  'force-tslv11'?: boolean;
  'force-tslv12'?: boolean;
  'force-tslv13'?: boolean;

  id?: string;
  'init-addr'?: InitAddr;
  inter?: number | string;
  fastinter?: number | string;
  downinter?: number | string;
  maxconn?: number;
  maxqueue?: number;
  'max-reuse'?: number;
  minconn?: number;
  namespace?: string;
  'no-agent-check'?: boolean;
  'no-backup'?: boolean;
  'no-check'?: boolean;
  'no-check-ssl'?: boolean;
  'no-send-proxy'?: boolean;
  'no-send-proxy-v2'?: boolean;
  'no-send-proxy-v2-ssl'?: boolean;
  'no-send-proxy-v2-ssl-cn'?: boolean;
  'no-ssl'?: boolean;
  'no-ssl-reuse'?: boolean;
  'no-sslv3'?: boolean;
  'no-tls-tickets'?: boolean;
  'no-tlsv10'?: boolean;
  'no-tlsv11'?: boolean;
  'no-tlsv12'?: boolean;
  'no-tlsv13'?: boolean;
  'no-verifyhost'?: boolean;
  'no-tfo'?: boolean;
  'non-stick'?: boolean;
  npn?: string[];
  observe?: string;
  'on-error'?: string;
  'on-marked-down'?: string;
  'on-marked-up'?: string;
  'pool-max-conn'?: number;
  'pool-purge-delay'?: number;
  proto?: string;
  redir?: string;
  rise?: number;
  'resolve-opts'?: string[];
  'resolve-prefer'?: 'ipv4' | 'ipv6';
  'resolve-net'?: IpAddr;
  resolvers?: string;
  'send-proxy'?: boolean;
  'send-proxy-v2'?: boolean;
  'proxy-v2-options'?: string[];
  'send-proxy-v2-ssl'?: boolean;
  'send-proxy-v2-ssl-cn'?: boolean;
  slowstart?: number | string;
  sni?: string;
  source?: string[];
  ssl?: boolean;
  'ssl-max-ver'?: SSLVer;
  'ssl-min-ver'?: SSLVer;
  'ssl-reuse'?: boolean;
  stick?: boolean;
  socks4?: string;
  'tcp-ut'?: number | string;
  tfo?: boolean;
  track?: string;
  'tls-tickets'?: boolean;
  verify?: 'none' | 'required';
  verifyhost?: string;
  weight?: number;
}
