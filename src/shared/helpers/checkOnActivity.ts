import * as H from 'history';

/**
 * @param activeLinks - Список ссылок на которые должна активизироваться текущая.
 * @param activeLinks - Список ссылок на которые НЕ должна активизироваться текущая.
 * Например если в списке есть /slots и /slots?sP=fiable и нужно что бы 1ая не активизировалась когда активна 2ая,
 * то нужно добавить в этот массив /slots?sP=fiable.
 */
export interface IActiveLink {
  activeLinks: string[];
  activeLinkExceptions?: string[];
}

/**
 * @param item - Элемент который нужно проверить на активность при указанных роутах.
 * @param location - Объект из history api.
 * @return {boolean} Активна ли текущая ссылка при текущем url.
 */
const checkOnActivity = <S = H.LocationState>(item: IActiveLink, location: H.Location<S>) => {
  const shieldedActiveLinks = item.activeLinks.map(link => {
    if (link === '/') return '/$';

    let result = '';
    for (let i = 0; i < link.length; i += 1) {
      if (link[i] === '?') result += '\\?';
      else result += link[i];
    }
    return result;
  });

  const shieldedActiveLinkExceptions =
    item.activeLinkExceptions &&
    item.activeLinkExceptions.map(link => {
      if (link === '/') return '/$';

      let result = '';
      for (let i = 0; i < link.length; i += 1) {
        if (link[i] === '?') result += '\\?';
        else result += link[i];
      }
      return result;
    });

  const pattern = shieldedActiveLinks.some(activeLink =>
    new RegExp(`(^${activeLink})`, 'gi').test(`${location.pathname}${location.search}${location.hash}`),
  );
  const patternException =
    shieldedActiveLinkExceptions &&
    shieldedActiveLinkExceptions.some(activeLinkException =>
      new RegExp(`(^${activeLinkException})`, 'gi').test(`${location.pathname}${location.search}`),
    );

  return pattern && !patternException;
};

export default checkOnActivity;
