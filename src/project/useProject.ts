import { useCallback } from 'react';
import { useDispatch } from '../store';
import { ProjectActions } from './project.state';

export const useProject = () => {
  const dispatch = useDispatch();

  const loadData = useCallback(() => {
    console.log('loading data');
    dispatch(ProjectActions.fetchProjects());
  }, []);

  return {
    api: {
      loadData,
    },
  };
};
