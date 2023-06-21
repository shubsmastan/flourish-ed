import { User, UserDoc } from "@/models/User";
import { dbConnect } from "./dbConnect";
import { Class } from "@/models/Class";

export const getUserClasses = async (id: string) => {
  try {
    await dbConnect();
    const user = await User.findById(id).populate({ path: "classes" });
    return user.classes;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createUserClass = async (id: string, name: string) => {
  try {
    await dbConnect();
    const user = await User.findById(id).populate({ path: "classes" });
    const newClass = await Class.create({
      name,
      teachers: [user._id],
    });
    user.classes.push(newClass._id);
    await user.save();
    return user.classes;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const deleteClass = async (userId: string, classId: string) => {
  try {
    await dbConnect();
    const user = await User.findById(userId).populate({ path: "classes" });
    user.classes.pull({ _id: classId });
    await user.save();
    const cls = await Class.findById(classId);
    cls.teachers.pull({ _id: userId });
    await cls.save();
    if (cls.teachers.length === 0) await Class.deleteOne({ _id: classId });
    return user.classes;
  } catch (err) {
    console.log(err);
    return null;
  }
};
