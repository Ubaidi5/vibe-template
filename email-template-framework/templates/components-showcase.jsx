/**
 * Components Showcase Template
 * Demonstrates the use of all components in our email framework
 */

import {
    Email,
    Row,
    Column,
    Text,
    Image,
    Button,
    Divider,
    Spacer,
    Container
} from '../src/components';

/**
 * ComponentsShowcase component
 * Demonstrates all available components in the framework
 * @param {Object} props - Template props
 * @returns {Email} - Email component
 */
const ComponentsShowcase = props => {
    return (
        <Email
            title="Email Framework Components"
            previewText="Check out all the components in our email framework!"
            width="600px"
            backgroundColor="#f8f9fa"
        >
            {/* Header */}
            <Row style={{ backgroundColor: '#343a40', padding: '20px 0' }}>
                <Column>
                    <Text
                        size="24px"
                        weight="bold"
                        align="center"
                        color="#ffffff"
                    >
                        Email Framework Components
                    </Text>
                </Column>
            </Row>

            <Spacer height="30px" />

            {/* Text Component Section */}
            <Row style={{ backgroundColor: 'white', padding: '20px' }}>
                <Column>
                    <Text
                        size="20px"
                        weight="bold"
                        color="#212529"
                    >
                        Text Component
                    </Text>

                    <Spacer height="15px" />

                    <Text>
                        This is the default Text component. You can adjust its size, color, alignment, weight and more.
                    </Text>

                    <Spacer height="10px" />

                    <Text size="18px" color="#0066cc" align="center" weight="bold">
                        Customized text with center alignment and color
                    </Text>

                    <Spacer height="10px" />

                    <Text linkTo="https://example.com">
                        This is a text with a link
                    </Text>
                </Column>
            </Row>

            <Spacer height="20px" />

            {/* Button Component Section */}
            <Row style={{ backgroundColor: 'white', padding: '20px' }}>
                <Column>
                    <Text
                        size="20px"
                        weight="bold"
                        color="#212529"
                    >
                        Button Component
                    </Text>

                    <Spacer height="15px" />

                    <Button href="https://example.com">
                        Default Button
                    </Button>

                    <Spacer height="15px" />

                    <Button
                        href="https://example.com"
                        backgroundColor="#28a745"
                        width="250px"
                    >
                        Custom Green Button
                    </Button>

                    <Spacer height="15px" />

                    <Button
                        href="https://example.com"
                        backgroundColor="#dc3545"
                        align="right"
                        borderRadius="0"
                    >
                        Right-Aligned Button
                    </Button>
                </Column>
            </Row>

            <Spacer height="20px" />

            {/* Divider Component Section */}
            <Row style={{ backgroundColor: 'white', padding: '20px' }}>
                <Column>
                    <Text
                        size="20px"
                        weight="bold"
                        color="#212529"
                    >
                        Divider Component
                    </Text>

                    <Spacer height="15px" />

                    <Text>Default divider below:</Text>
                    <Divider />

                    <Text>Custom styling divider:</Text>
                    <Divider color="#0066cc" height="3px" width="50%" />

                    <Text>Right-aligned divider:</Text>
                    <Divider color="#28a745" align="right" width="200px" />
                </Column>
            </Row>

            <Spacer height="20px" />

            {/* Spacer Component Section */}
            <Row style={{ backgroundColor: 'white', padding: '20px' }}>
                <Column>
                    <Text
                        size="20px"
                        weight="bold"
                        color="#212529"
                    >
                        Spacer Component
                    </Text>

                    <Spacer height="15px" />

                    <Text>A default 20px spacer follows:</Text>
                    <Spacer />
                    <Text>This text comes after the default spacer.</Text>

                    <Text>A 40px spacer follows:</Text>
                    <Spacer height="40px" />
                    <Text>This text comes after the 40px spacer.</Text>

                    <Text>A spacer with different mobile height (10px):</Text>
                    <Spacer height="30px" mobileHeight="10px" />
                    <Text>This text comes after the responsive spacer.</Text>
                </Column>
            </Row>

            <Spacer height="20px" />

            {/* Container Component Section */}
            <Row style={{ backgroundColor: 'white', padding: '20px' }}>
                <Column>
                    <Text
                        size="20px"
                        weight="bold"
                        color="#212529"
                    >
                        Container Component
                    </Text>

                    <Spacer height="15px" />

                    <Container backgroundColor="#e9ecef" padding="15px">
                        <Text align="center">
                            This is a Container component with background color and padding
                        </Text>
                    </Container>

                    <Spacer height="15px" />

                    <Container style={{ border: '1px solid #ced4da', borderRadius: '4px', padding: '15px' }}>
                        <Text align="center">
                            Container with custom border styling
                        </Text>
                    </Container>
                </Column>
            </Row>

            <Spacer height="20px" />

            {/* Responsive Layout Section */}
            <Row style={{ backgroundColor: 'white', padding: '20px' }}>
                <Column>
                    <Text
                        size="20px"
                        weight="bold"
                        color="#212529"
                    >
                        Responsive Columns
                    </Text>

                    <Spacer height="15px" />
                </Column>
            </Row>

            <Row style={{ backgroundColor: 'white', padding: '0 20px 20px' }}>
                <Column span={12} sm={24} style={{ padding: '10px' }}>
                    <Container backgroundColor="#e9ecef" padding="15px">
                        <Text align="center">
                            This column is 50% on desktop and 100% on mobile
                        </Text>
                    </Container>
                </Column>

                <Column span={12} sm={24} style={{ padding: '10px' }}>
                    <Container backgroundColor="#e9ecef" padding="15px">
                        <Text align="center">
                            This column is 50% on desktop and 100% on mobile
                        </Text>
                    </Container>
                </Column>
            </Row>

            <Row style={{ backgroundColor: 'white', padding: '0 20px 20px' }}>
                <Column span={8} sm={24} style={{ padding: '10px' }}>
                    <Container backgroundColor="#e9ecef" padding="15px">
                        <Text align="center">
                            1/3 Column
                        </Text>
                    </Container>
                </Column>

                <Column span={8} sm={24} style={{ padding: '10px' }}>
                    <Container backgroundColor="#e9ecef" padding="15px">
                        <Text align="center">
                            1/3 Column
                        </Text>
                    </Container>
                </Column>

                <Column span={8} sm={24} style={{ padding: '10px' }}>
                    <Container backgroundColor="#e9ecef" padding="15px">
                        <Text align="center">
                            1/3 Column
                        </Text>
                    </Container>
                </Column>
            </Row>

            <Spacer height="20px" />

            {/* Footer */}
            <Row style={{ backgroundColor: '#343a40', padding: '20px' }}>
                <Column>
                    <Text align="center" color="#ffffff" size="12px">
                        Email Framework Components Showcase
                    </Text>
                    <Spacer height="10px" />
                    <Text align="center" color="#ffffff" size="12px">
                        &copy; {new Date().getFullYear()} Your Company
                    </Text>
                </Column>
            </Row>
        </Email>
    );
};

export default ComponentsShowcase; 