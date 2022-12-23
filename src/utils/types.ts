export type Entity<T> = {
  ids: Id[];
  entities: Record<Id, T>;
};

export type Id = number | string;

export type Void = () => void;
