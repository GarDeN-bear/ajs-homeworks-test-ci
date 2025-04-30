export const states = ['healthy', 'wounded', 'critical'];

export function getHealthState(player) {
  if (player['health'] > 50) {
    return states[0];
  } else if ((player['health'] <= 50) && (player['health'] > 15)) {
    return states[1];
  } else {
    return states[2];
  }
}

export function sortHeroesByHealth(heroes) {
  return heroes.sort((a, b) => b.health - a.health);
}

import fetchData from './http';

export function getLevel(userId) {
  try {
    const response = fetchData(`https://server/user/${userId}`);

    if (response.status === 'ok') {
      return `Ваш текущий уровень: ${response.level}`;
    }
    return `Информация об уровне временно недоступна`;
  } catch (error) {
    return `Информация об уровне временно недоступна`;
  }
}