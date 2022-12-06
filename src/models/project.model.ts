import { faker } from '@faker-js/faker';

export interface IProject {
  id: number;
  nom: string;
}

let id = 1;

export const fakeProject = (): IProject => {
  const project: IProject = {
    id: id++,
    nom: faker.hacker.abbreviation(),
  };

  return project;
};
