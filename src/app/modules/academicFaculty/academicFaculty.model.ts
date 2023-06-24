import { Schema, model } from 'mongoose';
import {
  AcademicFacultyType,
  IAcademicFaculty,
} from './academicFaculty.interface';

const academicFacultyScheme = new Schema<IAcademicFaculty>(
  { title: { type: String, required: true, unique: true } },
  { timestamps: true }
);

export const AcademicFacultyModel = model<
  IAcademicFaculty,
  AcademicFacultyType
>('AcademicFaculty', academicFacultyScheme);
