import {

  useEffect,

  useState

} from "react";

import api from "../api/axios";

import LeadsTable from "../components/LeadsTable";

const Dashboard = () => {




  const [leads, setLeads] =
    useState<any[]>([]);




  const [search, setSearch] =
    useState("");




  const [status, setStatus] =
    useState("");




  const [source, setSource] =
    useState("");




  const [page, setPage] =
    useState(1);




  const [totalPages, setTotalPages] =
    useState(1);




  const [darkMode, setDarkMode] =
    useState(true);




  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      status: "New",

      source: "Website"

    });




  // FETCH LEADS

  const fetchLeads = async () => {

    try {

      const response =
        await api.get(

          `/leads?search=${search}&status=${status}&source=${source}&page=${page}`

        );




      setLeads(

        response.data.leads

      );




      setTotalPages(

        response.data.totalPages

      );

    } catch (error) {

      console.log(error);

    }

  };




  useEffect(() => {

    fetchLeads();

  }, [

    search,

    status,

    source,

    page

  ]);




  // CREATE LEAD

  const createLead = async () => {

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




  // CSV EXPORT

  const exportCSV = async () => {

    try {

      const response =
        await api.get(

          "/leads/export/csv",

          {

            responseType: "blob"

          }

        );




      const blob =
        new Blob(

          [response.data],

          {

            type:
              "text/csv"

          }

        );




      const url =
        window.URL.createObjectURL(

          blob

        );




      const link =
        document.createElement("a");




      link.href = url;

      link.download =
        "leads.csv";




      document.body.appendChild(

        link

      );




      link.click();




      document.body.removeChild(

        link

      );




      window.URL.revokeObjectURL(

        url

      );

    } catch (error) {

      console.log(error);

    }

  };




  // LOGOUT

  const logout = () => {

    localStorage.removeItem(

      "token"

    );




    window.location.href =
      "/login";

  };




  return (

    <div

      className={`

        min-h-screen

        transition-all

        duration-300

        p-6

        ${darkMode

          ? "bg-[#1f1f24] text-white"

          : "bg-gray-100 text-black"

        }

      `}

    >




      {/* TOP BAR */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-5xl font-bold">

          Smart Leads Dashboard

        </h1>




        <div className="flex gap-4">




          <button

            onClick={() =>

              setDarkMode(

                !darkMode

              )

            }

            className="bg-blue-600 px-5 py-3 rounded-lg"

          >

            Toggle Theme

          </button>




          <button

            onClick={exportCSV}

            className="bg-green-600 px-5 py-3 rounded-lg"

          >

            Export CSV

          </button>




          <button

            onClick={logout}

            className="bg-black px-5 py-3 rounded-lg"

          >

            Logout

          </button>

        </div>

      </div>




      {/* CREATE LEAD */}

      <div

        className={`

          p-6

          rounded-xl

          shadow-lg

          mb-8

          ${darkMode

            ? "bg-[#121212]"

            : "bg-white"

          }

        `}

      >




        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">




          <input

            type="text"

            placeholder="Lead Name"

            value={formData.name}

            onChange={(e) =>

              setFormData({

                ...formData,

                name: e.target.value

              })

            }

            className={`

              p-4

              rounded-lg

              border

              ${darkMode

                ? "bg-[#3a3a3a] text-white border-gray-600"

                : "bg-white text-black border-gray-300"

              }

            `}

          />




          <input

            type="email"

            placeholder="Lead Email"

            value={formData.email}

            onChange={(e) =>

              setFormData({

                ...formData,

                email: e.target.value

              })

            }

            className={`

              p-4

              rounded-lg

              border

              ${darkMode

                ? "bg-[#3a3a3a] text-white border-gray-600"

                : "bg-white text-black border-gray-300"

              }

            `}

          />




          <select

            value={formData.status}

            onChange={(e) =>

              setFormData({

                ...formData,

                status: e.target.value

              })

            }

            className={`

              p-4

              rounded-lg

              border

              ${darkMode

                ? "bg-[#3a3a3a] text-white border-gray-600"

                : "bg-white text-black border-gray-300"

              }

            `}

          >

            <option>

              New

            </option>

            <option>

              Contacted

            </option>

            <option>

              Qualified

            </option>

          </select>




          <select

            value={formData.source}

            onChange={(e) =>

              setFormData({

                ...formData,

                source: e.target.value

              })

            }

            className={`

              p-4

              rounded-lg

              border

              ${darkMode

                ? "bg-[#3a3a3a] text-white border-gray-600"

                : "bg-white text-black border-gray-300"

              }

            `}

          >

            <option>

              Website

            </option>

            <option>

              LinkedIn

            </option>

            <option>

              Instagram

            </option>

          </select>

        </div>




        <button

          onClick={createLead}

          className="bg-black text-white w-full mt-5 py-4 rounded-lg"

        >

          Create Lead

        </button>

      </div>




      {/* SEARCH + FILTERS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">




        <input

          type="text"

          placeholder="Search leads..."

          value={search}

          onChange={(e) =>

            setSearch(

              e.target.value

            )

          }

          className={`

            p-4

            rounded-lg

            border

            ${darkMode

              ? "bg-[#3a3a3a] text-white border-gray-600"

              : "bg-white text-black border-gray-300"

            }

          `}

        />




        <select

          value={status}

          onChange={(e) =>

            setStatus(

              e.target.value

            )

          }

          className={`

            p-4

            rounded-lg

            border

            ${darkMode

              ? "bg-[#3a3a3a] text-white border-gray-600"

              : "bg-white text-black border-gray-300"

            }

          `}

        >

          <option value="">

            All Status

          </option>

          <option>

            New

          </option>

          <option>

            Contacted

          </option>

          <option>

            Qualified

          </option>

        </select>




        <select

          value={source}

          onChange={(e) =>

            setSource(

              e.target.value

            )

          }

          className={`

            p-4

            rounded-lg

            border

            ${darkMode

              ? "bg-[#3a3a3a] text-white border-gray-600"

              : "bg-white text-black border-gray-300"

            }

          `}

        >

          <option value="">

            All Sources

          </option>

          <option>

            Website

          </option>

          <option>

            LinkedIn

          </option>

          <option>

            Instagram

          </option>

        </select>

      </div>




      {/* TABLE */}

      <LeadsTable

        leads={leads}

        fetchLeads={fetchLeads}

        darkMode={darkMode}

      />




      {/* PAGINATION */}

      <div className="flex justify-center items-center gap-4 mt-8">




        <button

          disabled={page === 1}

          onClick={() =>

            setPage(page - 1)

          }

          className="bg-gray-400 px-5 py-3 rounded-lg"

        >

          Prev

        </button>




        <span className="font-bold">

          Page {page} of {totalPages}

        </span>




        <button

          disabled={page === totalPages}

          onClick={() =>

            setPage(page + 1)

          }

          className="bg-gray-400 px-5 py-3 rounded-lg"

        >

          Next

        </button>

      </div>

    </div>

  );

};

export default Dashboard;