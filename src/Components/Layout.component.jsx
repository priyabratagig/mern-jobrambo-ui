import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './Navbar.component'
import Footer from './Footer.component'
import { toast } from 'sonner'
import { HOME } from '../configs'

const default_users = `{
    students: {
        henry: {
            email: 'henryjackson@yahoo.com',
            password: 11111111
        },
        taylor: {
            email: 'taylorfoster@gmail.com',
            password: 11111111
        }
    },
    recruiters: {
        austin: {
            email: 'ornarefacilisis@yahoo.com',
            password: 11111111
        },
        makloren: {
            email: 'maklorensmit@zebmail.com',
            password: 11111111
        }
    }
}`

export function Layout({ withNavbar, withFooter }) {
    const user = useSelector(({ user }) => user == null ? null : (typeof user?.email == 'string'))
    const displayMessage = useRef(true)

    useEffect(() => {
        if (displayMessage.current) {
            if (user != null) {
                displayMessage.current = false

                if (!user) {
                    if (window.location.pathname.startsWith(HOME)) {
                        toast.message('Try logging in:', {
                            description: <pre>{default_users}</pre>
                        })
                    }
                }
            }
        }
    }, [user])

    return (
        <section className='mx-8 flex flex-col min-h-screen'>
            {withNavbar && <Navbar />}
            <Outlet />
            {withFooter && <Footer />}
        </section>
    )
}

Layout.propTypes = {
    withNavbar: PropTypes.bool,
    withFooter: PropTypes.bool
}

export default Layout

