import { Model } from 'mongoose';

export type IAcademicFaculty = {
  title: string;
};

export type IAcademicFacultyFilters = {
  searchTerm?: string;
};
export type AcademicFacultyType = Model<IAcademicFaculty>;
