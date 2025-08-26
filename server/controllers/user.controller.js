exports.getUserProfile = async (req, res) => {
    if (req.user) {
        res.json({
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};