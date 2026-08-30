import { Calendar, Clock } from "lucide-react"
import { blogs } from "@/data"

const PAGE_BG = "bg-[#0f172a]"
const SURFACE = "bg-[#fff8ed] dark:bg-[#231509]"
const BORDER = "border-orange-200 dark:border-[#3d2410]"
const TEXT_PRI = "text-[#1c0a00] dark:text-[#fef3e2]"
const TEXT_SEC = "text-[#7c2d12] dark:text-[#fcd9a0]"
const TEXT_MUTED = "text-orange-400 dark:text-amber-700"
const GRAD_TEXT = "bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-300 bg-clip-text text-transparent"
const CARD = `${SURFACE} border ${BORDER} rounded-2xl transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-500`
const PILL = "bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-[#3d2410] text-orange-700 dark:text-orange-300 text-xs px-3 py-1 rounded-full font-medium"

export const Blog = () => {
  return (
    <div className={`${PAGE_BG} animate-fadeIn relative`}>
      {/* Glow Layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)',
          zIndex: 0
        }}
      />
      
      {/* Content Layer */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-20">
          {/* Heading block */}
          <h1 className={`${GRAD_TEXT} text-4xl font-extrabold mb-4`}>Blog</h1>
          <p className={`${TEXT_MUTED} text-base mb-12`}>
            Thoughts, tutorials and insights from my journey
          </p>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className={`${CARD} p-6 flex flex-col gap-4 relative opacity-90`}
              >
                {/* Coming Soon badge */}
                <span className="absolute top-4 right-4 bg-amber-100 border border-amber-300 text-amber-700 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-300 text-xs px-2.5 py-1 rounded-full font-medium">
                  Coming Soon
                </span>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span key={tag} className={PILL}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3
                  className={`${TEXT_PRI} font-bold text-lg leading-snug flex-1`}
                >
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className={`${TEXT_SEC} text-sm leading-relaxed`}>
                  {blog.excerpt}
                </p>

                {/* Bottom row */}
                <div
                  className={`flex items-center gap-4 text-xs ${TEXT_MUTED} mt-auto pt-3 border-t border-orange-100 dark:border-[#3d2410]`}
                >
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {blog.readTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
