import { Form, redirect } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }) {
  const db = new PrismaClient();

  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  await db.entry.create({
    data: {
      date: new Date(data.date),
      category: data.category,
      comment: data.comment,
    },
  });

  return redirect("/");
}

export default function Index() {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="text-4xl text-white">Work Journal</h1>
      <p className="mt-3 text-gray-400 text-xl">
        Doings and learnings. Updated weekly.
      </p>

      <div className="my-8 border p-3">
        <Form method="post">
          <p className="italic">Create an entry</p>

          <div className="mt-4">
            <div>
              <input type="date" name="date" className="text-gray-700" />
            </div>

            <div className="mt-2 space-x-6">
              <label>
                <input
                  type="radio"
                  name="category"
                  value="work"
                  className="mr-2"
                />
                Work
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="learning"
                  className="mr-2"
                />
                Learning
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="interesting-thing"
                  className="mr-2"
                />
                Interesting thing
              </label>
            </div>

            <div className="mt-2">
              <textarea
                name="comment"
                placeholder="Write your entry..."
                className="w-full text-gray-700"
              />
            </div>

            <div className="mt-2 text-right">
              <button
                type="submit"
                className="bg-blue-500 px-4 py-2 font-medium text-white"
              >
                Save
              </button>
            </div>
          </div>
        </Form>
      </div>

      {/* <div className="mt-8">
        <ul>
          <li>
            <p>
              Week of Feb 2<sup>nd</sup>, 2023
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <p>Work</p>
                <ul className="ml-6 list-disc">
                  <li>First thing</li>
                </ul>
              </div>

              <div>
                <p>Learning</p>
                <ul className="ml-6 list-disc">
                  <li>First thing</li>
                </ul>
              </div>

              <div>
                <p>Interesting things</p>
                <ul className="ml-6 list-disc">
                  <li>First thing</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div> */}
    </div>
  );
}
