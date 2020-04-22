import {ofType, unionize, UnionOf} from 'unionize';
import {unionizeConfig} from '../utils';
import {
  DefaultUpdateConfigData,
  UpdateConfigData,
  MVKUpdateConfigData,
} from '@vkontakte/vk-bridge';
import {Config} from '../../config';
import {LaunchParams} from '../../types';

type ConfigData =
  Omit<DefaultUpdateConfigData, 'app_id' | 'start_time'>
  & Omit<MVKUpdateConfigData, 'viewport_width' | 'viewport_height'>;

export interface ConfigReducerState extends ConfigData {
  appId: string;
  appConfig: Config;
  startTime: number;
  viewportWidth: number;
  viewportHeight: number;
  /**
   * Application launch parameters sent from VKontakte
   */
  launchParams: LaunchParams;
}

export const configActions = unionize({
  updateConfig: ofType<UpdateConfigData>(),
}, unionizeConfig);

type ConfigAction = UnionOf<typeof configActions>;

const initialState: ConfigReducerState = {
  app: 'vkclient',
  appConfig: {gqlHttpUrl: '', gqlWsUrl: ''},
  appId: '',
  appearance: 'light',
  scheme: 'client_light',
  insets: {top: 0, bottom: 0, right: 0, left: 0},
  startTime: 0,
  viewportHeight: 0,
  viewportWidth: 0,
  launchParams: {
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
  },
};

/**
 * Responsible for config sent from VKontakte
 */
function configReducer(
  state: ConfigReducerState = initialState,
  action: ConfigAction,
) {
  return configActions.match(action, {
    updateConfig: config => {
      if ('insets' in config) {
        const {app_id, start_time, ...restConfig} = config;

        return {
          ...state,
          ...restConfig,
          appId: app_id,
          startTime: start_time,
        };
      }
      const {viewport_height, viewport_width, ...restConfig} = config;

      return {
        ...state,
        ...restConfig,
        viewportHeight: viewport_height,
        viewportWidth: viewport_width,
      };
    },
    default: () => state,
  });
}

export default configReducer;
