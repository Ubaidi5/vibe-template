/**
 * Responsive Example Template
 * Demonstrates the fluid responsive approach without relying on media queries
 */

import { Email, Row, Column, Text, Image } from '../src/components';

/**
 * ResponsiveExample component
 * Creates a responsive email that works across different email clients
 * @param {Object} props - Template props
 * @returns {Email} - Email component
 */
const ResponsiveExample = props => {
    const {
        userName = 'Dear User',
        headerImage = 'https://via.placeholder.com/600x200',
        productImage = 'https://via.placeholder.com/300x300',
        ctaUrl = 'https://example.com',
        features = [
            'Works on all email clients',
            'Fluid responsive layout',
            'No media queries required',
            'Better Outlook support'
        ]
    } = props;

    return (
        <Email
            title="Responsive Email Example"
            previewText={`${userName}, check out our fluid responsive template!`}
            width="600px"
            fluid={true}
            backgroundColor="#f7f7f7"
        >
            {/* Header */}
            <Row>
                <Column>
                    <Image
                        src={headerImage}
                        alt="Header"
                        width="600"
                        height="200"
                        style={{ display: 'block', maxWidth: '100%' }}
                    />
                </Column>
            </Row>

            {/* Welcome Message */}
            <Row style={{ backgroundColor: 'white', padding: '30px 0' }}>
                <Column style={{ padding: '0 30px' }}>
                    <Text
                        size="24px"
                        weight="bold"
                        align="center"
                        color="#333333"
                        style={{ margin: '0 0 20px 0' }}
                    >
                        Hello, {userName}!
                    </Text>
                    <Text align="center" style={{ margin: '0 0 20px 0' }}>
                        This template demonstrates our new fluid responsive approach that works
                        reliably across email clients without depending on media queries.
                    </Text>
                </Column>
            </Row>

            {/* Two Column Section */}
            <Row style={{ backgroundColor: 'white', padding: '0 0 30px' }}>
                {/* Product Image */}
                <Column span={12} sm={24} style={{ padding: '0 20px' }}>
                    <Image
                        src={productImage}
                        alt="Product"
                        width="300"
                        height="300"
                        style={{ maxWidth: '100%', marginBottom: '20px' }}
                    />
                </Column>

                {/* Features List */}
                <Column span={12} sm={24} style={{ padding: '0 20px' }}>
                    <Text weight="bold" size="18px" style={{ marginBottom: '15px' }}>
                        Key Features:
                    </Text>

                    {features.map((feature, index) => (
                        <Text key={index} style={{ margin: '0 0 10px 0' }}>
                            • {feature}
                        </Text>
                    ))}

                    {/* Call to Action */}
                    <Row style={{ marginTop: '20px' }}>
                        <Column>
                            <Text
                                align="center"
                                color="#ffffff"
                                size="16px"
                                weight="bold"
                                linkTo={ctaUrl}
                                style={{
                                    backgroundColor: '#007bff',
                                    padding: '12px 24px',
                                    borderRadius: '4px',
                                    display: 'inline-block'
                                }}
                            >
                                Learn More
                            </Text>
                        </Column>
                    </Row>
                </Column>
            </Row>

            {/* Footer */}
            <Row style={{ backgroundColor: '#333', padding: '30px 0' }}>
                <Column style={{ padding: '0 30px' }}>
                    <Text align="center" color="#ffffff" size="12px">
                        © {new Date().getFullYear()} Your Company. All rights reserved.
                    </Text>
                    <Text align="center" color="#ffffff" size="12px" style={{ margin: '10px 0 0 0' }}>
                        You received this email because you're awesome!
                    </Text>
                </Column>
            </Row>
        </Email>
    );
};

export default ResponsiveExample; 