#!/usr/bin/env node

import inquirer from 'inquirer';
import { Food } from './models/food.js';
import { sequelize } from './utils/db.js';

const createList = async () => {
  console.clear();
  console.log('creating a list')
  welcome()
}

const addFood = async () => {
  console.clear();
  const input = await inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Add the name of the food?\n'
  });

  const input2 = await inquirer.prompt({
    name: 'price',
    type: 'list',
    message: `Describe the price of ${input.name}?\n`,
    choices: [
      '$',
      '$$',
      '$$$'
    ]
  });

  const input3 = await inquirer.prompt({
    name: 'target',
    type: 'list',
    message: `Is ${input.name} mainly meant for weekdays or weekends?\n`,
    choices: [
      'Weekdays',
      'Weekends'
    ]
  });

  console.clear()

  await Food.create({name: input.name, price: input2.price, weekday: input3.target === 'Weekdays'})

  const confirm = await inquirer.prompt({
    name: 'confirm',
    type: 'confirm',
    message: 'Do you want to add another food?'
  })

  if (confirm.confirm === true) {
    await addFood()
  }
}

const editFood = async () => {
  console.clear();
  console.log('editing food')
  welcome()
}

const removeFood = async () => {
  console.clear();
  console.log('removing food')
  welcome()
}

const showAllFoods = async () => {
  const foods = await Food.findAll()
  const names = foods.map(f => `${f.name} ${f.price}`)

  console.clear();
  
  const foodList = await inquirer.prompt({
    name: 'foods',
    type: 'list',
    message: 'Your foods\n',
    choices: [...names, new inquirer.Separator(), 'Go back'],
  });
}

const welcome = async () => {
  console.clear();

  const answers = await inquirer.prompt({
    name: 'welcome',
    type: 'list',
    message: 'What do you want to do?\n',
    choices: [
      'Create a list',
      'Add food',
      'Show all foods',
      new inquirer.Separator(),
      "Exit"
    ],
  });

  if (answers.welcome === 'Create a list') {
    await createList()
  } else if (answers.welcome === 'Add food') {
    await addFood()
  } else if (answers.welcome === 'Show all foods') {
    await showAllFoods()
  }

  if (answers.welcome !== 'Exit') {
    return await welcome()
  }

  await sequelize.close()
}

try {
  await sequelize.authenticate();
  await welcome();
} catch (error) {
  console.error('Unable to connect to the database:', error);
}