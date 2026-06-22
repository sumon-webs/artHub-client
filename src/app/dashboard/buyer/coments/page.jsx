import UsersCommentsTable from "@/components/dahsboard/buyer/BuyerCommentsTable.jsx/BuyerCommentsTable";
import { getCommentsByBuyerId } from "@/lib/api/comments";
import { getUserSession } from "@/lib/core/session";


const CommentsPage = async () => {
  const session = await getUserSession();
  const userId = session?.user?.id;

  const commentObj = await getCommentsByBuyerId({userId});
  const comments = commentObj?.data?.data || [];

  const hasComments = comments.length > 0;

  return (
    <div className="p-4 md:p-6">
      <div className="container mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          My Comments
        </h1>

        {/* Content */}
        {hasComments ? (
          <UsersCommentsTable userId={userId} comments={comments} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 transition">
            {/* Icon */}
            <div className="text-5xl mb-4">💬</div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              No comments yet
            </h2>

            {/* Subtitle */}
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-center max-w-md">
              You haven’t made any comments yet. When you comment on artworks,
              they will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsPage;
