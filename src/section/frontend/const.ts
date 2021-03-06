import { matchExactKey } from '../../utils/match-option';
import { haproxyOptionsKeys } from '../../const';

export const allowedOptionKeys = [
  haproxyOptionsKeys['acl'],
  haproxyOptionsKeys['backlog'],
  haproxyOptionsKeys['bind'],
  haproxyOptionsKeys['bind-process'],
  haproxyOptionsKeys['capture cookie'],
  haproxyOptionsKeys['capture request header'],
  haproxyOptionsKeys['capture response header'],
  haproxyOptionsKeys['clitcpka-cnt'],
  haproxyOptionsKeys['clitcpka-idle'],
  haproxyOptionsKeys['clitcpka-intvl'],
  haproxyOptionsKeys['compression'],
  haproxyOptionsKeys['declare capture'],
  haproxyOptionsKeys['default_backend'],
  haproxyOptionsKeys['description'],
  haproxyOptionsKeys['disabled'],
  haproxyOptionsKeys['email-alert from'],
  haproxyOptionsKeys['email-alert level'],
  haproxyOptionsKeys['email-alert mailers'],
  haproxyOptionsKeys['email-alert myhostname'],
  haproxyOptionsKeys['email-alert to'],
  haproxyOptionsKeys['enabled'],
  haproxyOptionsKeys['errorfile'],
  haproxyOptionsKeys['errorfiles'],
  haproxyOptionsKeys['errorloc'],
  haproxyOptionsKeys['errorloc302'],
  haproxyOptionsKeys['errorloc303'],
  haproxyOptionsKeys['filter'],
  haproxyOptionsKeys['grace'],
  haproxyOptionsKeys['http-after-response'],
  haproxyOptionsKeys['http-error'],
  haproxyOptionsKeys['http-request'],
  haproxyOptionsKeys['http-response'],
  haproxyOptionsKeys['id'],
  haproxyOptionsKeys['log'],
  haproxyOptionsKeys['log-format'],
  haproxyOptionsKeys['log-format-sd'],
  haproxyOptionsKeys['log-tag'],
  haproxyOptionsKeys['maxconn'],
  haproxyOptionsKeys['mode'],
  haproxyOptionsKeys['monitor fail'],
  haproxyOptionsKeys['monitor-uri'],
  haproxyOptionsKeys['option accept-invalid-http-request'],
  haproxyOptionsKeys['option clitcpka'],
  haproxyOptionsKeys['option contstats'],
  haproxyOptionsKeys['option disable-h2-upgrade'],
  haproxyOptionsKeys['option dontlog-normal'],
  haproxyOptionsKeys['option dontlognull'],
  haproxyOptionsKeys['option forwardfor'],
  haproxyOptionsKeys['option h1-case-adjust-bogus-client'],
  haproxyOptionsKeys['option http-buffer-request'],
  haproxyOptionsKeys['option http-ignore-probes'],
  haproxyOptionsKeys['option http-keep-alive'],
  haproxyOptionsKeys['option http-no-delay'],
  haproxyOptionsKeys['option http-server-close'],
  haproxyOptionsKeys['option http-use-proxy-header'],
  haproxyOptionsKeys['option httpclose'],
  haproxyOptionsKeys['option httplog'],
  haproxyOptionsKeys['option http_proxy'],
  haproxyOptionsKeys['option independent-streams'],
  haproxyOptionsKeys['option log-separate-errors'],
  haproxyOptionsKeys['option logasap'],
  haproxyOptionsKeys['option nolinger'],
  haproxyOptionsKeys['option originalto'],
  haproxyOptionsKeys['option socket-stats'],
  haproxyOptionsKeys['option splice-auto'],
  haproxyOptionsKeys['option splice-request'],
  haproxyOptionsKeys['option splice-response'],
  haproxyOptionsKeys['option tcp-smart-accept'],
  haproxyOptionsKeys['option tcpka'],
  haproxyOptionsKeys['option tcplog'],
  haproxyOptionsKeys['rate-limit sessions'],
  haproxyOptionsKeys['redirect'],
  haproxyOptionsKeys['stats admin'],
  haproxyOptionsKeys['stats auth'],
  haproxyOptionsKeys['stats enable'],
  haproxyOptionsKeys['stats hide-version'],
  haproxyOptionsKeys['stats http-request'],
  haproxyOptionsKeys['stats realm'],
  haproxyOptionsKeys['stats refresh'],
  haproxyOptionsKeys['stats scope'],
  haproxyOptionsKeys['stats show-desc'],
  haproxyOptionsKeys['stats show-legends'],
  haproxyOptionsKeys['stats show-node'],
  haproxyOptionsKeys['stats uri'],
  haproxyOptionsKeys['stick-table'],
  haproxyOptionsKeys['tcp-request connection'],
  haproxyOptionsKeys['tcp-request content'],
  haproxyOptionsKeys['tcp-request inspect-delay'],
  haproxyOptionsKeys['tcp-request session'],
  haproxyOptionsKeys['timeout client'],
  haproxyOptionsKeys['timeout client-fin'],
  haproxyOptionsKeys['timeout http-keep-alive'],
  haproxyOptionsKeys['timeout http-request'],
  haproxyOptionsKeys['timeout tarpit'],
  haproxyOptionsKeys['unique-id-format'],
  haproxyOptionsKeys['unique-id-header'],
  haproxyOptionsKeys['use_backend'],
];

export const isSupportedInFrontend = (key: string): boolean => matchExactKey(key, allowedOptionKeys);
