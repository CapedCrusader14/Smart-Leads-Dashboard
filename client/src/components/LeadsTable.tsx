import api from "../api/axios";

interface Props {

  leads: any[];

  fetchLeads: () => void;

  darkMode: boolean;

}

const LeadsTable = ({

  leads,

  fetchLeads,

  darkMode

}: Props) => {




  const handleDelete = async (

    id: string

  ) => {

    const confirmDelete =
      window.confirm(

        "Delete this lead?"

      );




    if (!confirmDelete) return;




    try {

      await api.delete(

        `/leads/${id}`

      );




      fetchLeads();

    } catch (error) {

      console.log(error);




      alert(

        "Delete failed"

      );

    }

  };




  return (

    <div

      className={`

        rounded-xl

        overflow-x-auto

        shadow-lg

        ${darkMode

          ? "bg-[#121212]"

          : "bg-white"

        }

      `}

    >




      <table className="w-full min-w-[1000px]">




        <thead

          className={`

            ${darkMode

              ? "bg-[#2a2a2a] text-white"

              : "bg-gray-200 text-black"

            }

          `}

        >




          <tr>

            <th className="p-5 text-left text-lg font-semibold">

              Name

            </th>




            <th className="p-5 text-left text-lg font-semibold">

              Email

            </th>




            <th className="p-5 text-left text-lg font-semibold">

              Status

            </th>




            <th className="p-5 text-left text-lg font-semibold">

              Source

            </th>




            <th className="p-5 text-left text-lg font-semibold">

              Created At

            </th>




            <th className="p-5 text-left text-lg font-semibold">

              Actions

            </th>

          </tr>

        </thead>




        <tbody>

          {

            leads.map((lead) => (

              <tr

                key={lead._id}

                className={`

                  border-t

                  transition-all

                  ${darkMode

                    ? "border-gray-700 hover:bg-[#1f1f24]"

                    : "border-gray-200 hover:bg-gray-50"

                  }

                `}

              >




                <td

                  className={`

                    p-5

                    ${darkMode

                      ? "text-white"

                      : "text-black"

                    }

                  `}

                >

                  {lead.name}

                </td>




                <td

                  className={`

                    p-5

                    ${darkMode

                      ? "text-white"

                      : "text-black"

                    }

                  `}

                >

                  {lead.email}

                </td>




                <td

                  className={`

                    p-5

                    font-medium

                    ${darkMode

                      ? "text-white"

                      : "text-black"

                    }

                  `}

                >

                  {lead.status}

                </td>




                <td

                  className={`

                    p-5

                    ${darkMode

                      ? "text-white"

                      : "text-black"

                    }

                  `}

                >

                  {lead.source}

                </td>




                <td

                  className={`

                    p-5

                    ${darkMode

                      ? "text-white"

                      : "text-black"

                    }

                  `}

                >

                  {

                    new Date(

                      lead.createdAt

                    ).toLocaleString()

                  }

                </td>




                <td className="p-5">




                  <button

                    onClick={() =>

                      handleDelete(

                        lead._id

                      )

                    }

                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-all"

                  >

                    Delete

                  </button>

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  );

};

export default LeadsTable;