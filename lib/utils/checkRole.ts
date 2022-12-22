const checkRole = (userLevel: number, role: number) => !!(userLevel & role);

export default checkRole;