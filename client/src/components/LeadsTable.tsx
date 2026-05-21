import api from "../api/axios";

interface Props {

  leads: any[];

  fetchLeads: () => void;

}

const LeadsTable = ({

  leads,

  fetchLeads

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

    <div className="bg-white rounded-lg shadow overflow-x-auto">

      <table className="w-full min-w-[900px]">




        <thead className="bg-gray-200">

          <tr>

            <th className="p-3 text-left">

              Name

            </th>

            <th className="p-3 text-left">

              Email

            </th>

            <th className="p-3 text-left">

              Status

            </th>

            <th className="p-3 text-left">

              Source

            </th>

            <th className="p-3 text-left">

              Created At

            </th>

            <th className="p-3 text-left">

              Actions

            </th>

          </tr>

        </thead>




        <tbody>

          {

            leads.map((lead) => (

              <tr

                key={lead._id}

                className="border-t"

              >




                <td className="p-3">

                  {lead.name}

                </td>




                <td className="p-3">

                  {lead.email}

                </td>




                <td className="p-3">

                  {lead.status}

                </td>




                <td className="p-3">

                  {lead.source}

                </td>




                <td className="p-3">

                  {

                    new Date(

                      lead.createdAt

                    ).toLocaleString()

                  }

                </td>




                <td className="p-3">

                  <button

                    onClick={() =>

                      handleDelete(

                        lead._id

                      )

                    }

                    className="bg-red-500 text-white px-3 py-1 rounded"

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