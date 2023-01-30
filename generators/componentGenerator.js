const testPath = (entity, moduleName) => `../src/modules/${moduleName}/${entity}/{{ name }}/{{ name }}.test.tsx`;
const mocksPath = (entity, moduleName) => `../src/modules/${moduleName}/${entity}/{{ name }}/{{ name }}.mock.tsx`;
const componentPath = (entity, moduleName) => `../src/modules/${moduleName}/${entity}/{{ name }}/{{ name }}.tsx`;
const storiesPath = (entity, moduleName) => `../src/modules/${moduleName}/${entity}/{{ name }}/{{ name }}.stories.tsx`;
const indexPath = (entity, moduleName) => `../src/modules/${moduleName}/${entity}/{{ name }}/index.tsx`;

module.exports = {
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Component name please',
    },
    {
      type: 'list',
      name: 'moduleName',
      message: 'Choose module',
      choices: [{ name: 'landing', value: 'landing' }],
    },
    {
      type: 'list',
      name: 'folder',
      message: 'Choose a folder',
      choices: [
        { name: 'components', value: 'components' },
        { name: 'containers', value: 'containers' },
      ],
    },
  ],
  actions: [
    {
      type: 'add',
      path: testPath('{{ camelCase folder}}', '{{ camelCase moduleName}}'),
      templateFile: 'templates/components/test.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: storiesPath('{{ camelCase folder}}', '{{ camelCase moduleName}}'),
      templateFile: 'templates/components/stories.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: componentPath('{{ camelCase folder}}', '{{ camelCase moduleName}}'),
      templateFile: 'templates/components/component.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: indexPath('{{ camelCase folder}}', '{{ camelCase moduleName}}'),
      templateFile: 'templates/components/index.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: mocksPath('{{ camelCase folder}}', '{{ camelCase moduleName}}'),
      templateFile: 'templates/components/mock.hbs',
      abortOnFail: true,
    },
  ],
};
