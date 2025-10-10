import React from "react";
import { FaDatabase, FaUser, FaShoppingCart, FaEquals, FaArrowDown } from "react-icons/fa";

const QueryLessonEachProduct = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-6 flex flex-col items-center">
      {/* Title Section */}
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-2xl p-8 border">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-4">
          🧩 SQL Lesson: See Each Product Purchased by Each User
        </h1>
        <p className="text-gray-600 text-center mb-6">
          This query combines two tables — <b>users</b> and <b>purchases</b> — 
          to display what each user bought and how much each item cost.
        </p>

        {/* Step 1 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 flex items-center gap-2 mb-2">
            <FaDatabase /> Step 1: SELECT — What do we want to see?
          </h2>
          <p className="text-gray-700">
            The <b>SELECT</b> statement tells SQL which columns we want in our final result.
            <br />
            Here, we’re selecting:
          </p>
          <ul className="list-disc ml-6 text-gray-700 mt-2">
            <li><b>u.full_name</b> and <b>u.email</b> → the user’s info</li>
            <li><b>p.product_name</b>, <b>p.quantity</b>, and <b>p.price</b> → purchase details</li>
            <li><b>(p.quantity * p.price)</b> → calculates total cost for that product</li>
          </ul>
        </div>

        {/* Step 2 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 flex items-center gap-2 mb-2">
            <FaUser /> Step 2: FROM users u
          </h2>
          <p className="text-gray-700">
            We start from the <b>users</b> table — this is our main table.
            The letter <b>u</b> is an alias (shortcut) so we can reference it easily later.
          </p>
        </div>

        {/* Step 3 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 flex items-center gap-2 mb-2">
            <FaShoppingCart /> Step 3: JOIN purchases p
          </h2>
          <p className="text-gray-700">
            Now we <b>JOIN</b> the <b>purchases</b> table so we can access what each user bought.
            The alias <b>p</b> stands for <b>purchases</b>.
          </p>
          <p className="text-gray-700 mt-2">
            But how does SQL know which rows to connect? That’s where <b>ON</b> comes in 👇
          </p>
        </div>

        {/* Step 4 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 flex items-center gap-2 mb-2">
            <FaEquals /> Step 4: ON p.user_id = u.id
          </h2>
          <p className="text-gray-700">
            This line defines the relationship between the two tables:
          </p>
          <p className="bg-gray-100 p-3 rounded-lg mt-2">
            👉 “Match each purchase with the user whose <b>id</b> equals <b>user_id</b>.”
          </p>
          <p className="text-gray-700 mt-2">
            That’s how we connect a purchase record to the correct user.
          </p>
        </div>

        {/* Step 5 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 flex items-center gap-2 mb-2">
            <FaArrowDown /> Step 5: ORDER BY u.full_name
          </h2>
          <p className="text-gray-700">
            Finally, we sort the results alphabetically by the user’s name, so it’s easier to read.
          </p>
        </div>

        {/* Query Box */}
        <div className="bg-gray-900 text-gray-100 rounded-lg p-5 font-mono mb-8 overflow-x-auto">
          <p>SELECT</p>
          <p className="ml-4">u.full_name,</p>
          <p className="ml-4">u.email,</p>
          <p className="ml-4">p.product_name,</p>
          <p className="ml-4">p.quantity,</p>
          <p className="ml-4">p.price,</p>
          <p className="ml-4">(p.quantity * p.price) AS total_item_cost</p>
          <p>FROM users u</p>
          <p>JOIN purchases p</p>
          <p>ON p.user_id = u.id</p>
          <p>ORDER BY u.full_name;</p>
        </div>

        {/* Step 6: Final Output */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-3">📊 Step 6: Final Result</h2>
          <p className="text-gray-700 mb-3">
            The query joins both tables and returns this result:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-left">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="py-2 px-4 border-b">Full Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Product</th>
                  <th className="py-2 px-4 border-b">Quantity</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Total Item Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Alice Johnson</td>
                  <td className="py-2 px-4 border-b">alice@email.com</td>
                  <td className="py-2 px-4 border-b">Shoes</td>
                  <td className="py-2 px-4 border-b">2</td>
                  <td className="py-2 px-4 border-b">$50.00</td>
                  <td className="py-2 px-4 border-b">$100.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Alice Johnson</td>
                  <td className="py-2 px-4 border-b">alice@email.com</td>
                  <td className="py-2 px-4 border-b">Hat</td>
                  <td className="py-2 px-4 border-b">1</td>
                  <td className="py-2 px-4 border-b">$20.00</td>
                  <td className="py-2 px-4 border-b">$20.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Bob Smith</td>
                  <td className="py-2 px-4 border-b">bob@email.com</td>
                  <td className="py-2 px-4 border-b">Jacket</td>
                  <td className="py-2 px-4 border-b">1</td>
                  <td className="py-2 px-4 border-b">$100.00</td>
                  <td className="py-2 px-4 border-b">$100.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">🧩 Summary</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li><b>FROM users u</b> — start from the users table</li>
            <li><b>JOIN purchases p</b> — connect with purchases</li>
            <li><b>ON p.user_id = u.id</b> — match users and purchases</li>
            <li><b>SELECT ...</b> — show user info + product details</li>
            <li><b>ORDER BY u.full_name</b> — list alphabetically</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QueryLessonEachProduct;
