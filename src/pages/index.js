import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'

export default function Home() {
  const [activeView, setActiveView] = useState('table')
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const alpineRef = useRef(null);

  // Fetch Public API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://json-placeholder.mock.beeceptor.com/companies')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        setCompanies(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  useEffect(() => {
    if (window.Alpine && alpineRef.current) {
      window.Alpine.initTree(alpineRef.current)
    }
  })

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[url(/bg.jpg)] bg-fill">
      <Head>
        <title>Company Management System</title>
        <meta name="description" content="Take-home assignment for Frontend Specialist Intern" />
        <link rel="icon" href="/favicon.ico" />
        <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className='absolute inset-0 bg-linear-360 from-transparent to-black/70'></div>
        <header className="relative mb-12 flex flex-col text-center text-white gap-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className='font-medium'>Company</span> Hub
          </h1>
          <p className="max-w-2xl text-xl mx-auto">
            Explore detailed profiles, key insights, and contact information for thousands of companies worldwide.
          </p>
        </header>

        {/* Alpine.js Carousel Component */}
        <section className="mb-12 rounded-2xl overflow-hidden shadow-xl" ref={alpineRef}>
          <div 
            className="relative w-full h-64 md:h-96 overflow-hidden"
            dangerouslySetInnerHTML={{
              __html: `
                <div x-data="{ isOpen: true }">
                  <button @click="isOpen = !isOpen" class='absolute top-4 right-4 z-10 text-white p-2 rounded-lg cursor-pointer bg-black/10 backdrop-blur-md hover:bg-opacity-100 transition-all'>
                    📷
                  </button>
                  <div x-show="isOpen" x-transition:enter="transition ease-out duration-300" 
                       x-transition:enter-start="opacity-0 transform scale-90" 
                       x-transition:enter-end="opacity-100 transform scale-100">
                    <div
                      x-show="isOpen"
                      x-data="{
                        images: [
                        'https://picsum.photos/800/400?random=9',
                        'https://picsum.photos/800/400?random=10',
                        'https://picsum.photos/800/400?random=11',
                        'https://picsum.photos/800/400?random=12',
                        'https://picsum.photos/800/400?random=13',
                        ],
                      current: 0,
                      init() {
                        setInterval(() => {
                          this.current = (this.current + 1) % this.images.length
                        }, 3000)
                      }
                    }"
                    class="relative w-full h-64 md:h-96 overflow-hidden shadow-xl"
                    >
                    <template x-for="(image, i) in images" :key="i">
                      <div class="absolute inset-0 transition-opacity duration-700"
                        x-show="current === i"
                        x-transition:enter="transition ease-out duration-700"
                        x-transition:enter-start="opacity-0"
                        x-transition:enter-end="opacity-100"
                        x-transition:leave="transition ease-in duration-700"
                        x-transition:leave-start="opacity-100"
                        x-transition:leave-end="opacity-0"
                      >
                      <img 
                      :src="image" 
                      class="w-full h-full object-cover"
                      />
                      <div class="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                      <div class="absolute bottom-0 left-0 p-6 text-white">
                        <h2 class="md:text-2xl sm:text-lg font-bold mb-2">Discover Leading Companies</h2>
                        <p class="md:text-lg sm:text-md">Explore our comprehensive database of industry leaders</p>
                      </div>
                    </div>
                  </template>

                  <!-- Indicators -->
                  <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    <template x-for="(image, i) in images" :key="i">
                      <button 
                        @click="current = i"
                        class="w-3 h-3 rounded-full transition-all"
                        :class="current === i ? 'bg-white w-8' : 'bg-white/50'"
                      ></button>
                    </template>
                  </div>

                  <!-- Navigation -->
                  <button 
                    @click="current = current === 0 ? images.length - 1 : current - 1"
                    class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full px-3 py-1 transition-all"
                  >
                    <
                  </button>
                  <button 
                    @click="current = (current + 1) % images.length"
                    class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full px-3 py-1 transition-all"
                  >
                    >
                  </button>
                </div>
              </div>
            </div>
              `,
            }}
          />
        </section>

        {/* Company Tabs */}
        <div className='relative'>
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 gap-3 bg-white/20 backdrop-blur-md rounded-full shadow-md">
              <button
                onClick={() => setActiveView('table')}
                className={`py-2 px-6 rounded-full font-medium text-sm transition-all ${
                  activeView === 'table'
                    ? 'text-white bg-black/10 backdrop-blur-md shadow-md'
                    : 'text-gray-300 hover:text-gray-900'
                }`}
              >
                Company List
              </button>
              <button
                onClick={() => setActiveView('form')}
                className={`py-2 px-6 rounded-full font-medium text-sm transition-all ${
                  activeView === 'form'
                    ? 'text-white bg-black/10 backdrop-blur-md shadow-md'
                    : 'text-gray-300 hover:text-gray-900'
                }`}
              >
                Company Registration
              </button>
            </div>
          </div>

            
          {/* Company List */}
          <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            {activeView === 'table' && (
              <section className="bg-black/20 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  
                  {/* Search Bar */}
                  <div className="relative w-full md:w-auto">
                    <input
                      type="text"
                      placeholder="Search companies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-64 py-2 px-10 border border-white/20 rounded-lg ring-1 ring-white/20 outline-none focus:ring-2 transition-all text-white"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      🔎
                    </div>
                  </div>
                </div>
                
                {/* Loading State */}
                {loading && (
                  <div className="flex justify-center items-center h-64">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
                      <span className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent rounded-full animate-spin border-b-purple-600 animation-delay-150"></span>
                    </div>
                  </div>
                )}

                {/* Desktop View Company List */}
                <div className="hidden md:block overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-sm text-gray-800 uppercase bg-white/70 backdrop-blur-md">
                      <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Industry</th>
                        <th scope="col" className="px-6 py-3">Country</th>
                        <th scope="col" className="px-6 py-3">Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCompanies.length > 0 ? (
                        filteredCompanies.map((company, i) => (
                          <tr key={i} className="bg-white/30 backdrop-blur-md border-b hover:bg-gray-50 transition-colors text-black">
                            <td className="px-6 py-4 font-medium whitespace-nowrap">
                              {company.name}
                            </td>
                            <td className="px-6 py-4">
                                {company.industry}
                            </td>
                            <td className="px-6 py-4">{company.country}</td>
                            <td className="px-6 py-4">{company.address}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                            No companies found matching your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View Company List */}
                <div className="block md:hidden">
                  {filteredCompanies.length > 0 ? (
                    <div className="space-y-4">
                      {filteredCompanies.map((company, i) => (
                        <div key={i} className="bg-white/30 backdrop-blur-md shadow-lg rounded-lg p-4 text-white">
                          <h3 className="font-bold text-lg mb-2">{company.name}</h3>
                          <div className="space-y-1">
                            <p className="text-sm">Industry: {company.industry}</p>
                            <p className="text-sm">Country: {company.country}</p>
                            <p className="text-sm">Address: {company.address}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-white">
                      No companies found matching your search.
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Company Registration */}
          {activeView === 'form' && (
            <section className="bg-black/20 backdrop-blur-md text-white rounded-2xl shadow-lg p-6 md:p-8">              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Enter company name"
                    />
                  </div>

                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium mb-1">
                      Industry Sector
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="">Select an industry</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Employee Size
                    </label>
                    <div className="space-y-2">
                      {['1-50', '51-200', '200+'].map((size, i) => (
                        <div key={i} className="flex items-center">
                          <input
                            id={`size${i}`}
                            name="employeeSize"
                            type="radio"
                            value={size}
                            className="h-4 w-4 border-gray-300"
                          />
                          <label htmlFor={`size${i}`} className="ml-2 block text-sm">
                            {size}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="company@example.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium mb-1">
                      Headquarters City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Enter city"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded`}
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm">
                    I agree to the Terms and Conditions
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                  >
                    Submit Registration
                  </button>
                </div>
              </form>
            </section>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .animation-delay-150 {
          animation-delay: 150ms;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  )
}