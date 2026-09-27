import { cloudinaryImage, cloudinaryRaw, PUBLIC_IDS } from '@/lib/cloudinary';

export const personal = {
  name: "Gourab Ganguly",
  title: "Software Developer",
  headline: "Software Developer | SDE-1 @ Ancile | Full Stack Developer",
  bio: "Software Developer with strong backend expertise in .NET and modern frontend development. I build scalable, maintainable enterprise applications with clean architecture and thoughtful user experiences.",
  email: "gourabofficial@gmail.com",
  linkedin: "https://www.linkedin.com/in/gourab-ganguly/",
  github: "https://github.com/gourabofficial",
  resume: cloudinaryRaw(PUBLIC_IDS.resume),
  photo: cloudinaryImage(PUBLIC_IDS.hero, { width: 480, transforms: 'c_fill,g_face,ar_1:1' }),
  location: "West Bengal, India",
} as const
