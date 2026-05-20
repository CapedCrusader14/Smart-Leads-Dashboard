import {
  useState
} from "react";

import api from "../api/axios";

interface Props {
  fetchLeads: () => void;
}

const CreateLeadForm = ({
  fetchLeads
}: Props) => {

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      status: "New",

      source: "Website"

    });




  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };




  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await api.post(
        "/leads",
        formData
      );

      setFormData({

        name: "",

        email: "",

        status: "New",

        source: "Website"

      });

      fetchLeads();

    } catch (error) {

      console.log(error);

    }

  };




  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
    >

      <input
        type="text"
        name="name"
        placeholder="Lead Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-3 rounded"
        required
      />




      <input
        type="email"
        name="email"
        placeholder="Lead Email"
        value={formData.email}
        onChange={handleChange}
        className="border p-3 rounded"
        required
      />




      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="border p-3 rounded"
      >

        <option value="New">
          New
        </option>

        <option value="Contacted">
          Contacted
        </option>

        <option value="Qualified">
          Qualified
        </option>

        <option value="Lost">
          Lost
        </option>

      </select>




      <select
        name="source"
        value={formData.source}
        onChange={handleChange}
        className="border p-3 rounded"
      >

        <option value="Website">
          Website
        </option>

        <option value="Instagram">
          Instagram
        </option>

        <option value="Referral">
          Referral
        </option>

      </select>




      <button
        className="bg-black text-white p-3 rounded md:col-span-4"
      >
        Create Lead
      </button>

    </form>

  );

};

export default CreateLeadForm;