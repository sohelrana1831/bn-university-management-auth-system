import { Schema, model } from 'mongoose';
import {
  AcademicDepartmentType,
  IAcademicDepartment,
} from './academicDepartment.interface';

const academicDepartmentScheme = new Schema<IAcademicDepartment>(
  {
    title: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AcademicDepartmentModel = model<
  IAcademicDepartment,
  AcademicDepartmentType
>('AcademicDepartment', academicDepartmentScheme);
