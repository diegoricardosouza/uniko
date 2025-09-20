'use client'
import { menuHome } from '@/config/menu';
import { cn } from '@/lib/utils';
import * as Menubar from '@radix-ui/react-menubar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { GoChevronDown, GoChevronRight } from 'react-icons/go';

export function MenuHomeMobile() {
  const pathname = usePathname();

  return (
    <Menubar.Root className='flex flex-wrap flex-col lg:flex-row lg:gap-[50px] lg:mr-5 z-[999]'>
      {menuHome.map((menu) => (
        <Menubar.Menu key={menu.label}>
          <Menubar.Trigger
            className={
              cn(
                'MenubarItem MenuItem',
                pathname === menu.href && 'menuActive'
              )
            }
            asChild
          >
            {menu.submenu ? (
              <div className='flex items-center cursor-pointer gap-1'>
                {menu.label}
                <div>
                  <GoChevronDown size={19} />
                </div>
              </div>
            ) : (
              <Link href={menu.href}>
                {menu.label}
              </Link>
            )}
          </Menubar.Trigger>

          {menu.submenu && (
            <Menubar.Content className="MenubarContent bg-white shadow-[0px_3px_6px_#00000029] flex flex-col mt-[-5px] z-[999] lg:z-[30]" align="center" sideOffset={5} alignOffset={-3}>
              {menu.submenu?.map((submenu) => (
                <React.Fragment key={submenu.label}>
                  {submenu.href ? (
                    <Menubar.Sub key={submenu.label}>
                      <Menubar.SubTrigger className="MenubarItem MenubarItemSub font-montserrat MenubarSubTrigger">
                        <Link href={submenu.href} className='flex items-center cursor-pointer w-full justify-between'>
                          {submenu.label}
                          <div>
                            <GoChevronRight size={17} />
                          </div>
                        </Link>
                      </Menubar.SubTrigger>
                    </Menubar.Sub>
                  ) : (
                    <Menubar.Item key={submenu.label} className="MenubarItem MenubarItemSub font-montserrat" asChild>
                      <Link href={submenu.href}>
                        {submenu.label}
                      </Link>
                    </Menubar.Item>
                  )}
                </React.Fragment>
              ))}
            </Menubar.Content>
          )}

        </Menubar.Menu>
      ))}
    </Menubar.Root>
  )
}