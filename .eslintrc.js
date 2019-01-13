module.exports = {
  'parser': 'babel-eslint',
  'extends': 'standard',
  'plugins': [
    'standard',
    'babel',
    'react'
  ],
  rules: {
    'standard/object-curly-even-spacing': [2, 'either'],
    'standard/array-bracket-even-spacing': [2, 'either'],
    'standard/computed-property-even-spacing': [2, 'even'],
    'standard/no-callback-literal': [2, ['cb', 'callback']],
    'react/jsx-uses-vars': [2]
  }
};
