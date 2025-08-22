export const dynamic = "force-dynamic";

export default async function IntakePage() {
  async function createPet(formData: FormData) {
    "use server";
    const form = Object.fromEntries(formData);
    if (!form.name || !form.description) {
      return;
    }
  }
  return (
    <>
      <div className="page-title">Intake Form</div>
      <div className="flex flex-col items-center">
        <form action={createPet} className="flex flex-col w-full p-4 md:w-md">
          <label htmlFor="name">Pet&apos;s Name</label>
          <input
            type="text"
            name="name"
            placeholder="Pet's Name"
            className="border-black border-2 rounded-sm mb-4"
          />
          <label htmlFor="description">Pet&apos;s Story</label>
          <textarea
            name="description"
            placeholder="Tell us about the pet."
            rows={5}
            className="border-black border-2 rounded-sm mb-4"
          />
          <div className="w-full flex flex-row justify-end">
            <input type="submit" value="Check In" className="btn btn-blue" />
          </div>
        </form>
      </div>
    </>
  );
}
