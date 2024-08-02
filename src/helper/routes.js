const routes = {
    auth: '/auth',
    home: '/',
    messages: '/messages',
    profilePart: '/profile',
}
routes.profile = routes.profilePart + '/:id'

export default routes