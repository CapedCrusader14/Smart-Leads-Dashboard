import {
  useEffect,
  useState
} from "react";

import api from "../api/axios";

import LeadsTable from "../components/LeadsTable";

import CreateLeadForm from "../components/CreateLeadForm";

import useDebounce from "../hooks/useDebounce";

const Dashboard = () => {

  // LEADS DATA

  const [leads, setLeads] =
    useState<any[]>([]);




  // SEARCH

  const [search, setSearch] =
    useState("");




  // FILTERS

  const [status, setStatus] =
    useState("");

  const [source, setSource] =
    useState("");




  // PAGINATION

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);




  // DARK MODE

  const [darkMode, setDarkMode] =
    useState(false);




  // DEBOUNCED SEARCH

  const debouncedSearch =
    useDebounce(search, 500);




  // FETCH LEADS

  const fetchLeads = async () => {

    try {

      const response =
        await api.get(

          `/leads?search=${debouncedSearch}&status=${status}&source=${source}&page=${page}&sort=latest`

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




  // FETCH ON LOAD / FILTER CHANGE

  useEffect(() => {

    fetchLeads();

  }, [

    debouncedSearch,

    status,

    source,

    page

  ]);




  // LOGOUT

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    window.location.href =
      "/login";

  };




  // EXPORT CSV

  const exportCSV = () => {

    window.open(

      "https://smart-leads-dashboard-api-ywtj.onrender.com/api/leads/export/csv",

      "_blank"

    );

  };




  return (

    <div

      className={`

        min-h-screen p-6 transition-all duration-300

        ${

          darkMode

            ? "bg-black text-white"

            : "bg-gray-100 text-black"

        }

      `}

    >

      <div className="max-w-7xl mx-auto">




        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">




          <h1 className="text-3xl font-bold">

            Smart Leads Dashboard

          </h1>




          <div className="flex flex-wrap gap-3">




            <button

              onClick={() =>

                setDarkMode(!darkMode)

              }

              className="bg-blue-600 text-white px-4 py-2 rounded"

            >

              Toggle Theme

            </button>




            <button

              onClick={exportCSV}

              className="bg-green-600 text-white px-4 py-2 rounded"

            >

              Export CSV

            </button>




            <button

              onClick={handleLogout}

              className="bg-black text-white px-4 py-2 rounded"

            >

              Logout

            </button>

          </div>

        </div>




        {/* CREATE LEAD FORM */}

        <CreateLeadForm

          fetchLeads={fetchLeads}

        />




        {/* FILTERS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">




          {/* SEARCH */}

          <input

            type="text"

            placeholder="Search leads..."

            value={search}

            onChange={(e) =>

              setSearch(e.target.value)

            }

            className="p-3 border rounded text-black"

          />




          {/* STATUS FILTER */}

          <select

            value={status}

            onChange={(e) =>

              setStatus(e.target.value)

            }

            className="p-3 border rounded text-black"

          >

            <option value="">

              All Status

            </option>

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




          {/* SOURCE FILTER */}

          <select

            value={source}

            onChange={(e) =>

              setSource(e.target.value)

            }

            className="p-3 border rounded text-black"

          >

            <option value="">

              All Sources

            </option>

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

        </div>




        {/* LEADS TABLE */}

        <LeadsTable

          leads={leads}

          fetchLeads={fetchLeads}

        />




        {/* PAGINATION */}

        <div className="flex items-center justify-center gap-4 mt-6">




          <button

            disabled={page === 1}

            onClick={() =>

              setPage(page - 1)

            }

            className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"

          >

            Prev

          </button>




          <span className="font-semibold">

            Page {page} of {totalPages}

          </span>




          <button

            disabled={page === totalPages}

            onClick={() =>

              setPage(page + 1)

            }

            className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"

          >

            Next

          </button>

        </div>

      </div>

    </div>

  );

};

export default Dashboard;