//Source: https://tailwindui.com/components/application-ui/navigation/navbars
//Requires Tailwind CSS v2.0+

import React from 'react';
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
 
const navigation = [
  { name: 'Shelf', href: '/shelf', current: true },
  { name: 'Store', href: '/', current: false },
  { name: 'FAQs', href: '/faqs', current: false },
  { name: 'Docs', href: '/docs', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {

  const router = useRouter();
  // const isActive = router.pathname === item.href;

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center text-center sm:items-center sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link href={'/'}>
                    <img
                      className="block lg:hidden h-8 w-auto bg-transparent"
                      src="https://bookverse.s3.eu-west-3.amazonaws.com/luis.png?shade=500"
                      alt="Logo"
                    />
                  </Link>
                  <Link href={'/'}>
                    <img
                      className="hidden lg:block h-8 w-auto bg-transparent"
                      src="https://bookverse.s3.eu-west-3.amazonaws.com/luis.png?shade=500"
                      alt="Logo"
                    />
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-6 align-middle items-center text-center">
                  <div className="flex space-x-4 align-middle items-center text-center">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        router={router}
                        className={classNames(
                          router.pathname === item.href ? 'bg-gray-900 text-white align-middle items-center text-center' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium align-middle items-center text-center'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <ConnectButton 
                  label='Sign In'
                  showBalance={{
                    smallScreen: false,
                    largeScreen: true,
                  }}
                />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden align-middle items-center text-center">
          {({ close }) => (
            <div className="px-2 pt-2 pb-3 space-y-1 align-middle items-center text-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  // as="a"
                  href={item.href}
                  className={classNames(
                    router.pathname === item.href ? 'bg-gray-900 text-white align-middle items-center text-center' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium align-middle items-center text-center'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                  onClick={() => close()}
                >
                  {item.name}
                </Link>
              ))}
            </div>)}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
