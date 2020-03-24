import {LaunchParams} from '../types/launch-params';

type Parser<K extends keyof LaunchParams> = [
  K,
  (value: string) => LaunchParams[K]
];

/**
 * Возвращает значение таким, какое оно есть
 * @param value
 * @returns {any}
 */
function asIs(value: any) {
  return value;
}

/**
 * Парсит строковое представление boolean
 * @param {string} value
 * @returns {boolean}
 */
function parseBoolean(value: string): boolean {
  return value === '1';
}

// Мап парсеров каждого поля
const paramParsers: Record<string, Parser<keyof LaunchParams>> = {
  vk_user_id: ['userId', parseInt],
  vk_app_id: ['appId', parseInt],
  vk_is_app_user: ['isAppUser', Boolean],
  vk_are_notifications_enabled: ['areNotificationsEnabled', parseBoolean],
  vk_language: ['language', asIs],
  vk_ref: ['ref', asIs],
  vk_access_token_settings: [
    'accessTokenSettings', value => value.length === 0 ? [] : value.split(','),
  ],
  vk_group_id: ['groupId', parseInt],
  vk_viewer_group_role: ['viewerGroupRole', asIs],
  vk_platform: ['platform', asIs],
  vk_is_favorite: ['isFavorite', parseBoolean],
  sign: ['sign', asIs],
};

/**
 * Возвращает параметры запуска переданные в приложение
 * @returns {LaunchParams}
 */
export function getLaunchParams(): LaunchParams {
  const query = window.location.search.slice(1);
  return query.split('&').reduce<any>((acc, pair) => {
    const [key, value] = pair.split('=');

    if (key in paramParsers !== undefined) {
      const [field, parse] = paramParsers[key];
      acc[field] = parse(value);
    }
    return acc;
  }, {
    accessTokenSettings: [],
    appId: 0,
    areNotificationsEnabled: false,
    isAppUser: false,
    isFavorite: false,
    language: 'ru',
    platform: 'desktop_web',
    ref: 'other',
    userId: 0,
    groupId: null,
    viewerGroupRole: null,
    sign: '',
  });
}
