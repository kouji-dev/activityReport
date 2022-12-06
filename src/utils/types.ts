export type Entity<T> = {
  ids: Id[];
  entities: Record<Id, T>;
};

export type Id = number | string;
