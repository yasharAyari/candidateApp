import type { NextPage } from 'next'
import Head from 'next/head'
import Styles from './index.module.css'
import Table from '../candidates/components/table'
import { Columns, Data } from '../candidates/interfaces'
import getAge from '../candidates/utils/getAge'
import { getCandidates } from '../candidates/services'

export async function getServerSideProps() {
  try {
    const response = await getCandidates()
    if(response.error) {
      return { props: { error: true } }
    }
    return { props: { data: response.data } }
  } catch {
    return { props: { error: true } }
  }
}

const Home: NextPage<{ data?: Data[], error?: boolean }> = ({ data, error }) => {

  const columns: Columns[] = [
    { key: 'name', label: 'Name', search: true },
    { key: 'email', label: 'Email' },
    { key: 'birth_date', label: 'Age', format: getAge },
    { key: 'year_of_experience', label: 'Years of Experience', sort: true },
    { key: 'position_applied', label: 'Position applied', sort: true, search: true },
    { key: 'application_date', label: 'Applied', sort: true },
    { key: 'status', label: 'Status', search: true },
  ];
  
  return (
    <div className={Styles.container}>
      <Head>
        <title>Candidate App</title>
        <meta name="description" content="Personio candidate application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {error && (
        <main className={Styles.errorContainer}>
          <h1>Ops !!! Some thing went wrong, Please refresh the page</h1>
        </main>
      )}
    
      {data && (
        <main className={Styles.tableWrapper}>
          <Table columns={columns} rows={data} />
        </main>
      )}
    </div>
  )
}

export default Home
