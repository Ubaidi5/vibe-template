/**
 * Welcome Email Template
 * Example of using JSX syntax with our email template framework
 */

// Import components is handled automatically by the transformer
// The transformer adds: const { BaseComponent, Row, Column, Text, Image, Email } = require('../src/components');

/**
 * WelcomeTemplate component
 * Creates a welcome email with user information
 * @param {Object} props - Template props
 * @param {string} props.userName - User's name
 * @param {string} props.userAvatar - User's avatar URL
 * @returns {Email} - Email component
 */
const WelcomeTemplate = (props) => {
    const { userName = 'User', userAvatar } = props;

    // Example of conditional rendering
    const showAvatar = !!userAvatar;

    return (
        <Email
            title="Welcome to Our Service"
            previewText={`Hi ${userName}, welcome to our service!`}
        >
            <Row>
                <Column>
                    <Text size="24px" weight="bold" align="center" color="#333333">
                        Welcome, {userName}!
                    </Text>
                </Column>
            </Row>

            {/* Conditional rendering example */}
            {showAvatar && (
                <Row style={{ marginTop: '20px' }}>
                    <Column>
                        <Image
                            src={userAvatar}
                            alt={`${userName}'s avatar`}
                            width="150"
                            height="150"
                            style={{ margin: '0 auto' }}
                        />
                    </Column>
                </Row>
            )}

            <Row style={{ marginTop: '20px' }}>
                <Column span={12} sm={24}>
                    <Text>
                        Thank you for signing up to our service. We're excited to have you on board!
                    </Text>
                </Column>
                <Column span={12} sm={24}>
                    <Text>
                        Get started by clicking the button below to complete your profile.
                    </Text>
                </Column>
            </Row>
        </Email>
    );
};

// Export the template
export default WelcomeTemplate; 