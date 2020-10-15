import { DiagnoseData } from '../types';
import diagnoses from '../data/diagnoses.json';

const getAll = (): DiagnoseData[] => diagnoses;

export default {
  getAll,
};
