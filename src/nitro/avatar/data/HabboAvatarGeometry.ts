export const HabboAvatarGeometry = {
    'geometry': {
        'direction': 0,
        'camera': {
            'x': 0,
            'y': 0,
            'z': 10
        },
        'canvases': [
            {
                'scale': 'h',
                'geometries': [
                    {
                        'id': 'vertical',
                        'width': 90,
                        'height': 130,
                        'dx': 0,
                        'dy': 0
                    },
                    {
                        'id': 'sitting',
                        'width': 90,
                        'height': 130,
                        'dx': 0,
                        'dy': 0
                    },
                    {
                        'id': 'horizontal',
                        'width': 128,
                        'height': 80,
                        'dx': 30,
                        'dy': 0
                    },
                    {
                        'id': 'swhorizontal',
                        'width': 192,
                        'height': 120,
                        'dx': 0,
                        'dy': -40
                    }
                ]
            },
            {
                'scale': 'sh',
                'geometries': [
                    {
                        'id': 'vertical',
                        'width': 45,
                        'height': 72,
                        'dx': 0,
                        'dy': 0
                    },
                    {
                        'id': 'sitting',
                        'width': 45,
                        'height': 72,
                        'dx': 0,
                        'dy': 0
                    },
                    {
                        'id': 'horizontal',
                        'width': 64,
                        'height': 50,
                        'dx': 15,
                        'dy': -10
                    },
                    {
                        'id': 'swhorizontal',
                        'width': 96,
                        'height': 70,
                        'dx': 0,
                        'dy': -20
                    },
                    {
                        'id': 'swim',
                        'width': 64,
                        'height': 70,
                        'dx': 25,
                        'dy': 10
                    }
                ]
            }
        ],
        'avatarSets': [
            {
                'id': 'full',
                'avatarSets': [
                    {
                        'id': 'body',
                        'main': true,
                        'bodyParts': [
                            {
                                'id': 'top'
                            },
                            {
                                'id': 'bottom'
                            },
                            {
                                'id': 'behind'
                            },
                            {
                                'id': 'torso'
                            },
                            {
                                'id': 'leftitem'
                            },
                            {
                                'id': 'rightitem'
                            },
                            {
                                'id': 'leftarm'
                            },
                            {
                                'id': 'rightarm'
                            }
                        ]
                    },
                    {
                        'id': 'head',
                        'bodyParts': [
                            {
                                'id': 'head'
                            }
                        ]
                    }
                ]
            }
        ],
        'types': [
            {
                'id': 'vertical',
                'bodyParts': [
                    {
                        'id': 'top',
                        'x': 0,
                        'y': 0,
                        'z': 0.0,
                        'radius': 2.0
                    },
                    {
                        'id': 'bottom',
                        'x': 0,
                        'y': 0,
                        'z': 0.0,
                        'radius': 0.001
                    },
                    {
                        'id': 'behind',
                        'x': 0,
                        'y': 0,
                        'z': 0.2,
                        'radius': 0.3
                    },
                    {
                        'id': 'torso',
                        'x': 0,
                        'y': 0,
                        'z': 0.0,
                        'radius': 0.4,
                        'items': [
                            {
                                'id': 'bd',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'bds',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'ch',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.04,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'sh',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.02,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'lg',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.03,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ss',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.04,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'cp',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.045,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'wa',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.05,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'cc',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.06,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ca',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.07,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'leftitem',
                        'x': 0,
                        'y': 0,
                        'z': -0.29,
                        'radius': 0.3,
                        'items': [
                            {
                                'id': 'li',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'rightitem',
                        'x': 0,
                        'y': 0,
                        'z': -0.29,
                        'radius': 0.3,
                        'items': [
                            {
                                'id': 'ri',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'leftarm',
                        'x': -1,
                        'y': 0,
                        'z': -0.51,
                        'radius': 0.5,
                        'items': [
                            {
                                'id': 'lh',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'lhs',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ls',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.02,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'lc',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.025,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'rightarm',
                        'x': 1,
                        'y': 0,
                        'z': -0.51,
                        'radius': 0.5,
                        'items': [
                            {
                                'id': 'rh',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'rhs',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'rs',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.02,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'rc',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.025,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'head',
                        'x': 0,
                        'y': 0,
                        'z': 0,
                        'radius': 0.5,
                        'items': [
                            {
                                'id': 'hd',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'fc',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.02,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ey',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.03,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'hr',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.04,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'hrb',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.05,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'fa',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.06,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ea',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.07,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ha',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.08,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'he',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.09,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    }
                ]
            },
            {
                'id': 'sitting',
                'bodyParts': [
                    {
                        'id': 'top',
                        'x': 0,
                        'y': 0,
                        'z': 0.0,
                        'radius': 2.0
                    },
                    {
                        'id': 'bottom',
                        'x': 0,
                        'y': 0,
                        'z': 0.0,
                        'radius': 0.001
                    },
                    {
                        'id': 'behind',
                        'x': 0,
                        'y': 0,
                        'z': 0.2,
                        'radius': 0.3
                    },
                    {
                        'id': 'torso',
                        'x': 0,
                        'y': 0,
                        'z': 0.0,
                        'radius': 0.4,
                        'items': [
                            {
                                'id': 'bd',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'bds',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'ch',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.03,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'sh',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.04,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'lg',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.02,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ss',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.04,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'cp',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.045,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'wa',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.05,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'cc',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.06,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ca',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.07,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'leftitem',
                        'x': 0,
                        'y': 0,
                        'z': -0.29,
                        'radius': 0.3,
                        'items': [
                            {
                                'id': 'li',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'rightitem',
                        'x': 0,
                        'y': 0,
                        'z': -0.29,
                        'radius': 0.3,
                        'items': [
                            {
                                'id': 'ri',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'leftarm',
                        'x': -1,
                        'y': 0,
                        'z': -0.51,
                        'radius': 0.5,
                        'items': [
                            {
                                'id': 'lh',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'lhs',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ls',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.02,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'lc',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.025,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'rightarm',
                        'x': 1,
                        'y': 0,
                        'z': -0.51,
                        'radius': 0.5,
                        'items': [
                            {
                                'id': 'rh',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'rhs',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'rs',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.02,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'rc',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.025,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'head',
                        'x': 0,
                        'y': 0,
                        'z': 0,
                        'radius': 0.5,
                        'items': [
                            {
                                'id': 'hd',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'fc',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.02,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ey',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.03,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'hr',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.04,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'hrb',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.05,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'fa',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.06,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ea',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.07,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ha',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.08,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'he',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.09,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    }
                ]
            },
            {
                'id': 'horizontal',
                'bodyParts': [
                    {
                        'id': 'torso',
                        'x': 0,
                        'y': 0,
                        'z': 0.0,
                        'radius': 0.4,
                        'items': [
                            {
                                'id': 'bd',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'bds',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'ch',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.02,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'cp',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.025,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'sh',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.04,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'lg',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.03,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ss',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.03,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'wa',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.05,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'cc',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.06,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ca',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.07,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'leftitem',
                        'x': 0,
                        'y': 0,
                        'z': -0.29,
                        'radius': 0.3,
                        'items': [
                            {
                                'id': 'li',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'rightitem',
                        'x': 0,
                        'y': 0,
                        'z': -0.29,
                        'radius': 0.3,
                        'items': [
                            {
                                'id': 'ri',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'leftarm',
                        'x': -1,
                        'y': 0,
                        'z': -0.51,
                        'radius': 0.6,
                        'items': [
                            {
                                'id': 'lh',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'lhs',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ls',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.02,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'lc',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.025,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'rightarm',
                        'x': 1,
                        'y': 0,
                        'z': -0.51,
                        'radius': 0.6,
                        'items': [
                            {
                                'id': 'rh',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'rhs',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'rs',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.02,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'rc',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.025,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'head',
                        'x': 0,
                        'y': 0,
                        'z': 0,
                        'radius': 0.5,
                        'items': [
                            {
                                'id': 'hd',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'fc',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.02,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ey',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.03,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'hr',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.04,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'hrb',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.05,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'fa',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.06,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ea',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.07,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ha',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.08,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'he',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.09,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    }
                ]
            },
            {
                'id': 'swhorizontal',
                'bodyParts': [
                    {
                        'id': 'torso',
                        'x': 0,
                        'y': 0,
                        'z': 0.0,
                        'radius': 0.4,
                        'items': [
                            {
                                'id': 'bd',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'bds',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'ch',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.02,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'cp',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.025,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'sh',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.04,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'lg',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.03,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ss',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.03,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'wa',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.05,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'cc',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.06,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ca',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.07,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'leftitem',
                        'x': 0,
                        'y': 0,
                        'z': -0.29,
                        'radius': 0.3,
                        'items': [
                            {
                                'id': 'li',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'rightitem',
                        'x': 0,
                        'y': 0,
                        'z': -0.29,
                        'radius': 0.3,
                        'items': [
                            {
                                'id': 'ri',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'leftarm',
                        'x': -1,
                        'y': 0,
                        'z': -0.51,
                        'radius': 0.6,
                        'items': [
                            {
                                'id': 'lh',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'lhs',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ls',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.02,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'lc',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.025,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'rightarm',
                        'x': 1,
                        'y': 0,
                        'z': -0.51,
                        'radius': 0.6,
                        'items': [
                            {
                                'id': 'rh',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'rhs',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'rs',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.02,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'rc',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.025,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'head',
                        'x': 0,
                        'y': 0,
                        'z': 0,
                        'radius': 0.5,
                        'items': [
                            {
                                'id': 'hd',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'fc',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.02,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ey',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.03,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'hr',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.04,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'hrb',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.05,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'fa',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.06,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ea',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.07,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ha',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.08,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'he',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.09,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    }
                ]
            },
            {
                'id': 'swim',
                'bodyParts': [
                    {
                        'id': 'torso',
                        'x': 0,
                        'y': 0,
                        'z': 0.0,
                        'radius': 0.4,
                        'items': [
                            {
                                'id': 'bds',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'ss',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.03,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    },
                    {
                        'id': 'head',
                        'x': 0,
                        'y': 0,
                        'z': 0,
                        'radius': 0.5,
                        'items': [
                            {
                                'id': 'hd',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.01,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'fc',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.02,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ey',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.03,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'hr',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.04,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'hrb',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.05,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': true
                            },
                            {
                                'id': 'fa',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.06,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ea',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.07,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'ha',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.08,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            },
                            {
                                'id': 'he',
                                'x': 0,
                                'y': 0,
                                'z': 0,
                                'radius': 0.09,
                                'nx': 0,
                                'ny': 0,
                                'nz': -1,
                                'double': false
                            }
                        ]
                    }
                ]
            }
        ]
    }
};
