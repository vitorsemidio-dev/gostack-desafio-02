const names = [
  'Genos',
  'Hellish Blizzard',
  'Mumen Rider',
  'Kinzoku Batto',
  'Tank-Top Master',
  'Senkou no Flash',
  'Kudou Kishi',
  'Metal Knight',
  'Atomic Samurai',
  'Silver Fang',
  'Senritsu no Tatsumaki',
  'Garou',
];

const students = names.map(s => {
  const name = s;
  const email = `${s}@onepunchman.com`;
  const age = Math.ceil(10 + Math.random() * 50);
  const height = (1 + Math.random()).toFixed(2);
  const weight = Math.ceil(Math.random() * 70 + 40);
  const created_at = new Date();
  const updated_at = new Date();
  return { name, email, age, height, weight, created_at, updated_at };
});

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert('students', students, {});
  },

  down: () => {},
};
