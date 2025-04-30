import * as tasks from '../tasks';

const heroes = [
  {name: 'лучник', health: 1}, {name: 'маг', health: 100},
  {name: 'мечник', health: 40}
];

test('Health test', () => {
  const test1Results = ['critical', 'healthy', 'wounded'];

  for (let i = 0; i < heroes.length; ++i) {
    expect(tasks.getHealthState(heroes[i])).toBe(test1Results[i]);
  }
})

// New test for sorting
test('Sort heroes by health', () => {
  expect(tasks.sortHeroesByHealth(heroes)).toEqual([
    {name: 'маг', health: 100},
    {name: 'мечник', health: 40},
    {name: 'лучник', health: 1},
  ]);
});

import fetchData from '../http'

jest.mock('../http');

test('Return the correct level when fetchData returns ok', () => {
  fetchData.mockReturnValue({status: 'ok', level: 5});

  const result = tasks.getLevel(1);

  expect(result).toBe('Ваш текущий уровень: 5');
  expect(fetchData).toHaveBeenCalledWith('https://server/user/1')
});

test('Return error message when fetchData does not return ok', () => {
  fetchData.mockReturnValue({status: 'error'});

  const result = tasks.getLevel(1);

  expect(result).toBe('Информация об уровне временно недоступна');
});

test('Handle errors from fetchData', () => {
  fetchData.mockImplementation(() => {
    throw new Error('Mock this!');
  });

  const result = tasks.getLevel(1);

  expect(result).toBe('Информация об уровне временно недоступна');
});
