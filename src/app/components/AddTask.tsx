const AddTask = () => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center my-0 mx-auto">
      <input
        type="text"
        placeholder="Enter Title"
        className="input input-bordered w-full max-w-xs"
      />
      <button className="btn btn-primary">ADD</button>
    </div>
  );
};
export default AddTask;
