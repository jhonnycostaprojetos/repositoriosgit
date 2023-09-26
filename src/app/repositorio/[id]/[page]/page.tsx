import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa'

interface PageDetailsProps {
  params: {
    id: string,
    page: string
  }
}

export default async function Repositorio({ params }: PageDetailsProps) {

  async function getData(id: string, page: string) {
    const response = await fetch(`https://api.github.com/repos/${id}/${page}`)
    return response.json();
  }
  async function getDataIssue(id: string, page: string) {
    const responseIssue = await fetch(`https://api.github.com/repos/${id}/${page}/issues`)
    return responseIssue.json();
  }

  const data = await getData(params.id, params.page)
  const dataI = await getDataIssue(params.id, params.page)

  console.log(dataI)

  return (
    <div className={`max-w-screen-md bg-white rounded py-7 px-7 m-auto`}>
      <Link href="\" className={`mt-4`}>
        <FaArrowLeft size={20} />
      </Link>
      <div className={`flex flex-col items-center `}>
        <img className={`w-40 rounded-xl m-5`} src={data.owner.avatar_url} alt={data.owner.login} />
        <h1 className={`text-3xl font-[#0D2636]`}>{data.name}</h1>
        <p className={`mt-1 text-sm text-black text-center max-w-sm`}>{data.description}</p>
      </div>
      <div>
        <ul className={`mt-8 pt-8 border-t-2 border-1 border-gray-300`}>
          {dataI.map(issue => (
            <li className={`flex p-4`} key={String(issue.id)}>
              <img className={`w-9 h-9 rounded-full border-2 border-[#0d2636]`} src={issue.user.avatar_url} alt={issue.user.login} />
              <div className={`flex-1 ml-3`}>
                <strong className={`text-sm`}>
                  <a className={`text-gray-400 hover:text-blue-500 transform`} href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span className={`text-white bg-[#222] rounded font-semibold px-1 py-0.5 ml-1`} key={String(label.id)}> {label.name}</span>
                  ))}
                </strong>
                <p className={`text-sm mt-2 text-black`}>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

}