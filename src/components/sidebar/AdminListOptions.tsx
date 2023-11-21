import Link from 'next/link'
import React from 'react'

function AdminListOptions() {
  return (
    <ul>
      <li>
        <Link
          href="/"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-gray-700 group"
        >
          <svg
            className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 21"
          >
            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
          </svg>
          <span className="ml-3">Inicio</span>
        </Link>
      </li>
      <li>
        <Link
          href="/courses"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-gray-700 group"
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 18"
          >
            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
          </svg>
          <span className="flex-1 ml-3 whitespace-nowrap">Cursos</span>
        </Link>
      </li>
      <li>
        <Link
          href="/users"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-gray-700 group"
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            viewBox="0 0 18 18"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier"></g>
            <g id="SVGRepo_tracerCarrier"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M12.5 7.333C12.5 8.62148 11.4555 9.666 10.167 9.666C8.8785 9.666 7.83398 8.62148 7.83398 7.333C7.83398 6.04452 8.8785 5 10.167 5C11.4555 5 12.5 6.04452 12.5 7.333Z"
                stroke="#000000"
              ></path>
              <path
                d="M14.833 15.733C14.833 17.533 12.744 19 10.166 19C7.588 19 5.5 17.537 5.5 15.733C5.5 13.929 7.589 12.467 10.167 12.467C12.745 12.467 14.833 13.929 14.833 15.733Z"
                stroke="#000000"
              ></path>
              <path
                d="M17.439 9.51102C17.439 10.2842 16.8122 10.911 16.039 10.911C15.2658 10.911 14.639 10.2842 14.639 9.51102C14.639 8.73782 15.2658 8.11102 16.039 8.11102C16.4103 8.11102 16.7664 8.25852 17.0289 8.52107C17.2915 8.78362 17.439 9.13972 17.439 9.51102Z"
                stroke="#000000"
              ></path>
              <path
                d="M16.7 18.067C18.1138 18.1831 19.3596 17.1445 19.5 15.733C19.3591 14.3218 18.1134 13.2839 16.7 13.4"
                stroke="#000000"
              ></path>
            </g>
          </svg>
          <span className="flex-1 ml-3 whitespace-nowrap">Usuarios</span>
        </Link>
      </li>
      <li>
        <Link
          href="/tuitions"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-gray-700 group"
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier"></g>
            <g id="SVGRepo_tracerCarrier"></g>
            <g id="SVGRepo_iconCarrier">
              <g id="File / Note_Edit">
                <path
                  id="Vector"
                  d="M10.0002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2839 19.7822 18.9076C20 18.4802 20 17.921 20 16.8031V14M16 5L10 11V14H13L19 8M16 5L19 2L22 5L19 8M16 5L19 8"
                  stroke="#000000"
                ></path>
              </g>
            </g>
          </svg>
          <span className="flex-1 ml-3 whitespace-nowrap">Matriculas</span>
        </Link>
      </li>
      <li>
        <Link
          href="/notes"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-gray-700 group"
        >
          <svg
            viewBox="0 0 24 24"
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier"></g>
            <g id="SVGRepo_tracerCarrier"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z"
                stroke="#000000"
              ></path>
            </g>
          </svg>
          <span className="flex-1 ml-3 whitespace-nowrap">Notas</span>
        </Link>
      </li>
      <li>
        <Link
          href="/reports"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-gray-700 group"
        >
          <svg
            viewBox="0 0 24 24"
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier"></g>
            <g id="SVGRepo_tracerCarrier"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z"
                stroke="#000000"
              ></path>
            </g>
          </svg>
          <span className="flex-1 ml-3 whitespace-nowrap">Reportes</span>
        </Link>
      </li>

      <li>
        <Link
          href="/certificates"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-gray-700 group"
        >
          <svg
            viewBox="0 0 24 24"
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier"></g>
            <g id="SVGRepo_tracerCarrier"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z"
                stroke="#000000"
              ></path>
            </g>
          </svg>
          <span className="flex-1 ml-3 whitespace-nowrap">Constancias</span>
        </Link>
      </li>
    </ul>
  )
}

export default AdminListOptions
