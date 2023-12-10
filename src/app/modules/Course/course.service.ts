import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.const';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (paylod: TCourse) => {
  const result = await Course.create(paylod);
  return result;
};

const getAllCourseFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourse.course'),
    query
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDb = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourse.course'
  );
  return result;
};
const delteSingleCourseFromDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
  return result;
};
const updateCourseIntoDb = async (id: string, paylod: Partial<TCourse>) => {
  const { preRequisiteCourse, ...courseReaminingData } = paylod;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // step1 basic course info update
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseReaminingData,
      { new: true, runValidators: true, session }
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

    //check if pre requisted course exist in the payload
    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      // filter out the deleted fields
      const deletedPreRequisite = preRequisiteCourse
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      const deletedPreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletedPreRequisite } },
          },
        },
        {
          session,
          new: true,
          runValidators: true,
        }
      );
      if (!deletedPreRequisiteCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }
      // filter out the new course fields and add
      const newPreRequisites = preRequisiteCourse?.filter(
        (el) => el.course && !el.isDeleted
      );
      const newPreRequisitesCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourse: { $each: newPreRequisites } },
        },
        {
          session,
          new: true,
          runValidators: true,
        }
      );
      if (!newPreRequisitesCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }
    }
    const result = await Course.findById(id).populate(
      'preRequisiteCourse.course'
    );
    return result;
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    }
  );
  return result;
};

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCourseFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    }
  );
  return result;
};

export const CourseSerices = {
  createCourseIntoDB,
  getAllCourseFromDb,
  getSingleCourseFromDb,
  delteSingleCourseFromDb,
  updateCourseIntoDb,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
};
